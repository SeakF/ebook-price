import { Injectable } from '@nestjs/common';
import { HttpExtensionService } from '../http-extension/http-extension.service';
import { DateHelpersService } from '../helpers/date-helpers.service';

@Injectable()
export class NbpWrapperService {
  private readonly nbpUrl = 'http://api.nbp.pl/api';
  private readonly nbpFormat = 'json';

  private readonly nbpTable = 'a';

  constructor(
    private readonly httpExtensionService: HttpExtensionService,
    private readonly dateHelpersService: DateHelpersService,
  ) {}

  async fetch(dateInMiliseconds: number | string, currencyCode: string) {
    const dateArrayISO8601 = this.getDateMonthSpanInISO8601(
      Number(dateInMiliseconds),
    );

    if (dateArrayISO8601.length == 1) {
      const response = await this.httpExtensionService.instance.get(
        `${this.nbpUrl}/exchangerates/rates/${this.nbpTable}/${currencyCode}/?format=${this.nbpFormat}`,
      );
  
      const result = response.data?.rates[0];
  
      return result;
    } else {
      const response = await this.httpExtensionService.instance.get(
        `${this.nbpUrl}/exchangerates/rates/${this.nbpTable}/${currencyCode}/${dateArrayISO8601[0]}/${dateArrayISO8601[1]}?format=${this.nbpFormat}`,
      );
  
      const firstResult = response.data?.rates[0];

      // only if rare situation happens and there is a weekend between starting date in span and ending date in span and there is no nbp data 
      // then get newest nbp data for certain currency
      if (!firstResult) {
        let {day, month, year} = this.dateHelpersService.getDateChunks(new Date());
        month = month + 1;
        const dateString = this.dateHelpersService.adjustDateString(day, month, year);

        const response = await this.httpExtensionService.instance.get(
          `${this.nbpUrl}/exchangerates/rates/${this.nbpTable}/${currencyCode}/${dateString}?format=${this.nbpFormat}`,
        );

        const result = response.data?.rates[0];

        return result;
      } else {
        return firstResult;
      }
    }
  }

  private getDateMonthSpanInISO8601(
    dateInMiliseconds: number,
  ): [string, string] | [string] {
    const {day: actualDay, month: actualMonth, year: actualYear} = this.dateHelpersService.getDateChunks(new Date());
    const dateActualString = this.dateHelpersService.adjustDateString(actualDay, actualMonth + 1, actualYear);
    const today = new Date(dateActualString);

    const dateStart = new Date(dateInMiliseconds);

    if (dateStart > today) {
      return [dateActualString];
    }

    let {day: dayStart, month: monthStart, year: yearStart} = this.dateHelpersService.getDateChunks(dateStart);

    yearStart = yearStart > 2002 ? yearStart : 2002;

    const dateEnd = new Date(
      new Date(`${yearStart}-${monthStart + 1}-${dayStart}`).setMonth(
        monthStart + 1,
      ),
    );

    const endingDate = dateEnd > today ? today : dateEnd

    let {day: dayEnd, month: monthEnd, year: yearEnd} = this.dateHelpersService.getDateChunks(endingDate);

    monthStart = monthStart + 1;
    monthEnd = monthEnd + 1;

    const dateStartString = this.dateHelpersService.adjustDateString(dayStart, monthStart, yearStart);

    const dateEndString = this.dateHelpersService.adjustDateString(dayEnd, monthEnd, yearEnd);

    return [
      dateStartString,
      dateEndString,
    ];
  }
}
