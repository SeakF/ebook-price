import { Injectable } from '@nestjs/common';
import { NbpWrapperService } from '../nbp-wrapper/nbp-wrapper.service';
import { ItunesWrapperService } from '../itunes-wrapper/itunes-wrapper.service';
import { DateHelpersService } from '../helpers/date-helpers.service';

interface ebookNameTitle {
  name: string;
  title: string;
}

@Injectable()
export class EbookPriceService {
  constructor(
    private readonly nbpWrapperService: NbpWrapperService,
    private readonly itunesWrapperService: ItunesWrapperService,
    private readonly dateHelpersService: DateHelpersService,
  ) {}

  async calculate(nameTitleArray: ebookNameTitle[]) {
    const itunesPromises = [];
    for (const value of nameTitleArray) {
      itunesPromises.push(
        this.itunesWrapperService.fetch(value.name, value.title),
      );
    }

    const itunesResults = await Promise.all(itunesPromises);

    const flattenedItunesResults = itunesResults.flatMap(
      ({ results }) => results,
    );

    const resolvedResult = [];
    for (const itunesResult of flattenedItunesResults) {
      const date = itunesResult.releaseDate;
      const currency = itunesResult.currency;
      const firstNbpResult = await this.nbpWrapperService.fetch(
        new Date(date).getTime(),
        currency,
      );

      const { day, month, year } = this.dateHelpersService.getDateChunks(
        new Date(itunesResult.releaseDate),
      );
      const releaseDateString = this.dateHelpersService.adjustDateString(
        day,
        month + 1,
        year,
      );

      resolvedResult.push({
        name: itunesResult.artistName,
        title: itunesResult.trackName,
        curr: itunesResult.currency,
        price: itunesResult.price,
        date: releaseDateString,
        fromNBP: {
          rate: firstNbpResult.mid,
          pricePLN: this.calculateWithExchangeRate(
            firstNbpResult.mid,
            itunesResult.price,
          ),
          tableNo: firstNbpResult.no,
        },
      });
    }
    return resolvedResult;
  }

  private calculateWithExchangeRate(
    exchangeRate: number,
    priceToCalculate: number,
  ) {
    return priceToCalculate * exchangeRate;
  }
}
