import { Injectable } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { HttpClient } from '@angular/common/http';
import { ADMIN_ALL_ORDERS, ADMIN_UPDATE_ORDER, ADMIN_ORDERS_BY_STATUS } from 'src/app/shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ADMIN_ALL_ORDERS);
  }

  getOrdersByStatus(status: string): Observable<Order[]> {
    return this.http.get<Order[]>(ADMIN_ORDERS_BY_STATUS + status);
  }

  updateOrder(order: Order) {
    return this.http.put<Order>(ADMIN_UPDATE_ORDER + order.id, { status: order.status});
  }
}

