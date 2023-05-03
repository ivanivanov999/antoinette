import { Injectable } from '@angular/core';
import { Order } from '../shared/models/order';
import { HttpClient } from '@angular/common/http';
import { ORDERS_BY_USER, ORDER_CREATE_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  create(order: Order) {
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ORDERS_BY_USER);
  }
}
