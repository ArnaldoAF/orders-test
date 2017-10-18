import { AfterContentInit, Component, OnInit, Input } from '@angular/core';

import { Broadcaster } from '../../shared/services/broadcaster';
import { GetDateService } from '../../shared/services/get-date.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit, AfterContentInit {
  @Input() usersList
  filteredOrders: any

  constructor(
    private broadcaster: Broadcaster,
    private getDateService: GetDateService
  ) {}

  ngOnInit() {
    this.filteredOrders = this.usersList
    this.broadcaster.on('filterUpdate').subscribe(filter => {
      if (filter === 'all-time') {
        this.usersList = this.filteredOrders
        return
      } else if (filter === 'today') {
        this.isToday().map((today, index) => {
          if (today) {
            this.usersList = this.usersList.filter(user => {
              return user.date === this.getDateService.today().todayUTC
            })
          }
        })
      } else {
        const today = this.getDateService.today().today
        console.log(this.thisWeek())
      }
    })
  }

  thisWeek() {
    const weekDays = this.getDateService.thisWeek()
    return this.usersList.map(user => {
      const userDate = new Date(user.date)
      return userDate >= weekDays.first && userDate <= weekDays.last
    })
  }

  isToday() {
    return this.usersList.map(user => {
      return user.date === this.getDateService.today().todayUTC
    })
  }

  ngAfterContentInit() {
    this.filteredOrders = this.usersList
    this.isToday()
  }

}
