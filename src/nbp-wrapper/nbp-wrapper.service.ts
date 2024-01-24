import { Injectable } from '@nestjs/common';
import { HttpExtensionService } from 'src/http-extension/http-extension.service';

@Injectable()
export class NbpWrapperService {
  private readonly nbpUrl = 'http://api.nbp.pl/api';
  private readonly nbpFormat = 'json';

  private readonly nbpTable = 'a';
  private readonly nbpCurrencyCode = 'usd';

  constructor(private readonly httpExtensionService: HttpExtensionService) {}

  async fetch(dateInMiliseconds: number | string) {
    const dateArrayISO8601 = this.getDateMonthSpanInISO8601(
      Number(dateInMiliseconds),
    );

    const response = await this.httpExtensionService.instance.get(
      `${this.nbpUrl}/exchangerates/rates/${this.nbpTable}/${this.nbpCurrencyCode}/${dateArrayISO8601[0]}/${dateArrayISO8601[1]}?format=${this.nbpFormat}`,
    );

    const firstResult = response.data?.rates[0];

    return firstResult;
  }

  private getDateMonthSpanInISO8601(
    dateInMiliseconds: number,
  ): [string, string] {
    const dateStart = new Date(dateInMiliseconds);
    let dayStart: string | number = dateStart.getDate();
    let monthStart: string | number = dateStart.getMonth();
    let yearStart = dateStart.getFullYear();

    yearStart = yearStart > 2002 ? yearStart : 2002;

    const dateEnd = new Date(
      new Date(`${yearStart}-${monthStart + 1}-${dayStart}`).setMonth(
        monthStart + 1,
      ),
    );
    let dayEnd: string | number = dateEnd.getDate();
    let monthEnd: string | number = dateEnd.getMonth();
    const yearEnd = dateEnd.getFullYear();

    monthStart = monthStart + 1;
    monthEnd = monthEnd + 1;

    dayStart = dayStart >= 10 ? dayStart : `0${dayStart}`;

    monthStart = monthStart >= 10 ? monthStart : `0${monthStart}`;

    dayEnd = dayEnd >= 10 ? dayEnd : `0${dayEnd}`;

    monthEnd = monthEnd >= 10 ? monthEnd : `0${monthEnd}`;

    return [
      `${yearStart}-${monthStart}-${dayStart}`,
      `${yearEnd}-${monthEnd}-${dayEnd}`,
    ];
  }
}
