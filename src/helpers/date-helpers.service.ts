import { Injectable } from '@nestjs/common';

@Injectable()
export class DateHelpersService {
  getDateChunks(date: Date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return {
      day,
      month,
      year,
    };
  }

  adjustDateString(day: number, month: number, year: number) {
    const adjustedDay = day >= 10 ? day : `0${day}`;
    const adjustedMonth = month >= 10 ? month : `0${month}`;

    return `${year}-${adjustedMonth}-${adjustedDay}`;
  }
}
