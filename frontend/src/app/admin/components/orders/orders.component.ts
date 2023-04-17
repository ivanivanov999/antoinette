import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  orders$: Observable<Order[]>;

  constructor(orderService: OrderService) {
    this.orders$ = orderService.getOrders();
  }
}
