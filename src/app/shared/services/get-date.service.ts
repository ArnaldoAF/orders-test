import { Injectable } from '@angular/core';

@Injectable()
export class GetDateService {
  date = new Date()
  constructor() {}

  today() {
    return {
      today: this.date,
      todayUTC: new Date(+this.date - this.date.getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0]
    }
  }

  thisWeek() {
    const today = new Date()
    const first = today.getDate() - today.getDay() + 1
    const last = first + 6

    return {
      first: new Date(today.setDate(first)),
      last: new Date(today.setDate(last))
    }
  }
}
