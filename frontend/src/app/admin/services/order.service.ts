import { Injectable } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { HttpClient } from '@angular/common/http';
import { ORDERS_URL } from 'src/app/shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ORDERS_URL);
  }
}

