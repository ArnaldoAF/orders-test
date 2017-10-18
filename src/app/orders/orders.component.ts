import { Component, OnInit } from '@angular/core';

import { GetMockService } from '../shared/services/get-mock.service';
import { Broadcaster } from '../shared/services/broadcaster';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  usersList: any

  constructor(
    private getMockService: GetMockService,
    private broadcaster: Broadcaster
  ) { }

  ngOnInit() {
    this.getMockService.getMock().subscribe(data => {
      this.usersList = data
      this.broadcaster.on('updatedOrderList').subscribe(newData => {
        this.usersList = newData
      })
    })
  }

}
