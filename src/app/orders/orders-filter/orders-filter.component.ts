import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

import { Broadcaster } from '../../shared/services/broadcaster';

@Component({
  selector: 'app-orders-filter',
  templateUrl: './orders-filter.component.html',
  styleUrls: ['./orders-filter.component.css']
})
export class OrdersFilterComponent implements OnInit {
  today: string
  thisWeek: string
  allTime: string
  filter: string
  value = 'all-time'

  constructor(private broadcaster: Broadcaster) { }

  ngOnInit() {}

  onChange(e) {
    this.filter = e
    this.broadcaster.broadcast('filterUpdate', this.filter)
  }

}
