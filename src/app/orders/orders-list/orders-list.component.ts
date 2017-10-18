import { AfterContentInit, Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms'

import { Broadcaster } from '../../shared/services/broadcaster';
import { GetDateService } from '../../shared/services/get-date.service';
import { GetMockService } from '../../shared/services/get-mock.service';
import { OrdersEditComponent } from '../orders-edit/orders-edit.component';

declare const $

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit, AfterContentInit {
  @Input() usersList
  filteredOrders: any
  user: any

  constructor(
    private broadcaster: Broadcaster,
    private getDateService: GetDateService,
    private getMockService: GetMockService
  ) {}

  ngOnInit() {
    this.filteredOrders = this.usersList
    this.broadcaster.on('filterUpdate').subscribe(filter => {
      if (filter === 'all-time') {
        this.usersList = this.filteredOrders
      } else if (filter === 'today') {
        this.usersList = this.usersList.filter(user => {
          return user.date === this.getDateService.today().todayUTC
        })
      } else {
        this.usersList = this.filteredOrders
        const weekDays = this.getDateService.thisWeek()
        this.usersList = this.usersList.filter(user => {
          const userDate = new Date(user.date)
          return userDate >= weekDays.first && userDate <= weekDays.last
        })
      }
    })
  }

  update(user) {
    this.user = user
    this.broadcaster.broadcast('editUser', this.user)
    $('.modal').modal('show')
  }

  delete(user) {
    this.usersList.map((usr, index) => {
      if (user === usr) {
        this.usersList.splice(index, 1)
        this.getMockService.deleteOrder(this.usersList).subscribe()
      }
    })
  }

  ngAfterContentInit() {
    this.filteredOrders = this.usersList
  }

}
