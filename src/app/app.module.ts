import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrdersAddComponent } from './orders/orders-add/orders-add.component';
import { OrdersFilterComponent } from './orders/orders-filter/orders-filter.component';
import { Broadcaster } from './shared/services/broadcaster';
import { GetMockService } from './shared/services/get-mock.service';
import { GetDateService } from './shared/services/get-date.service';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrdersListComponent,
    OrdersAddComponent,
    OrdersFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GetMockService,
    GetDateService,
    Broadcaster
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
