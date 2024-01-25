import { Inject, Injectable } from '@nestjs/common';
import { HttpExtensionService } from '../http-extension/http-extension.service';
import { DateHelpersService } from '../helpers/date-helpers.service';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { addDays } from 'date-fns';

@Injectable()
export class NbpWrapperService {
  private readonly nbpUrl: string;
  private readonly nbpFormat = 'json';

  private readonly nbpTable = 'a';

  private readonly numberOfDaysCacheWillCheck = 5;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly httpExtensionService: HttpExtensionService,
    private readonly dateHelpersService: DateHelpersService,
    private readonly configService: ConfigService,
  ) {
    this.nbpUrl = this.configService.get('NBP_URL');
  }

  async fetch(dateInMiliseconds: number | string, currencyCode: string) {
    const dateArrayISO8601 = this.getDateMonthSpanInISO8601(
      Number(dateInMiliseconds),
    );

    const cachedResults = await this.checkInCache(
      currencyCode,
      dateArrayISO8601[0],
    );

    if (cachedResults.length > 0) {
      return cachedResults[0];
    }

    if (dateArrayISO8601.length == 1) {
      const response = await this.httpExtensionService.instance.get(
        `${this.nbpUrl}/exchangerates/rates/${this.nbpTable}/${currencyCode}/?format=${this.nbpFormat}`,
      );

      const result = response.data?.rates[0];

      result && this.saveToCache(response.data.rates, currencyCode);

      return result;
    } else {
      const response = await this.httpExtensionService.instance.get(
        `${this.nbpUrl}/exchangerates/rates/${this.nbpTable}/${currencyCode}/${dateArrayISO8601[0]}/${dateArrayISO8601[1]}?format=${this.nbpFormat}`,
      );

      const firstResult = response.data?.rates[0];

      // only if rare situation happens and there is a weekend between starting date in span and ending date in span and there is no nbp data
      // then get newest nbp data for certain currency
      if (!firstResult) {
        const { day, month, year } = this.dateHelpersService.getDateChunks(
          new Date(),
        );

        const dateString = this.dateHelpersService.adjustDateString(
          day,
          month + 1,
          year,
        );

        const response = await this.httpExtensionService.instance.get(
          `${this.nbpUrl}/exchangerates/rates/${this.nbpTable}/${currencyCode}/${dateString}?format=${this.nbpFormat}`,
        );

        const result = response.data?.rates[0];

        result && this.saveToCache(response.data.rates, currencyCode);

        return result;
      } else {
        firstResult && this.saveToCache(response.data.rates, currencyCode);

        return firstResult;
      }
    }
  }

  private getDateMonthSpanInISO8601(
    dateInMiliseconds: number,
  ): [string, string] | [string] {
    const {
      day: actualDay,
      month: actualMonth,
      year: actualYear,
    } = this.dateHelpersService.getDateChunks(new Date());
    const dateActualString = this.dateHelpersService.adjustDateString(
      actualDay,
      actualMonth + 1,
      actualYear,
    );
    const today = new Date(dateActualString);

    const dateStart = new Date(dateInMiliseconds);

    if (dateStart > today) {
      return [dateActualString];
    }

    const {
      day: dayStart,
      month: monthStart,
      year: yearStart,
    } = this.dateHelpersService.getDateChunks(dateStart);

    const yearStartParsed = yearStart > 2002 ? yearStart : 2002;

    const dateEnd = new Date(
      new Date(`${yearStartParsed}-${monthStart + 1}-${dayStart}`).setMonth(
        monthStart + 1,
      ),
    );

    const endingDate = dateEnd > today ? today : dateEnd;

    const {
      day: dayEnd,
      month: monthEnd,
      year: yearEnd,
    } = this.dateHelpersService.getDateChunks(endingDate);

    const monthStartParsed = monthStart + 1;
    const monthEndParsed = monthEnd + 1;

    const dateStartString = this.dateHelpersService.adjustDateString(
      dayStart,
      monthStartParsed,
      yearStartParsed,
    );

    const dateEndString = this.dateHelpersService.adjustDateString(
      dayEnd,
      monthEndParsed,
      yearEnd,
    );

    return [dateStartString, dateEndString];
  }

  private async checkInCache(currency: string, startDate: string) {
    const keys: string[] = [];
    for (let i = 0; i < this.numberOfDaysCacheWillCheck; i++) {
      const incrementedDateByDay = addDays(new Date(startDate), i);
      const { day, month, year } =
        this.dateHelpersService.getDateChunks(incrementedDateByDay);
      const parsedMonth = month + 1;
      const adjustedDateString = this.dateHelpersService.adjustDateString(
        day,
        parsedMonth,
        year,
      );
      keys.push(`cache:currency_rates:${currency}:${adjustedDateString}`);
    }

    const values = await this.cacheManager.store.mget(...keys);

    const result = [];
    values.forEach((value) => {
      value && value != 'nil' && value != '(nil)' && result.push(value);
    });

    return result;
  }

  private saveToCache(
    rates: Record<string, string | number>[],
    currency: string,
  ) {
    rates.forEach((value) => {
      this.cacheManager.set(
        `cache:currency_rates:${currency}:${value.effectiveDate}`,
        value,
      );
    });
  }
}
