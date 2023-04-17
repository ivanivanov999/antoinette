import { Injectable } from '@angular/core';
import { Cover, Item } from '../shared/models/item';
import { cover } from 'src/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DELIVERIES_URL, ITEMS_BY_CATEGORY_URL, ITEMS_BY_SEARCH_URL, ITEMS_URL, ITEM_BY_ID_URL } from '../shared/constants/urls';
import { Delivery } from '../shared/models/delivery.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getCover(): Cover {
    return cover;
  }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(ITEMS_URL);
  }

  getItemById(itemId: string): Observable<Item> {
    return this.http.get<Item>(ITEM_BY_ID_URL + itemId);
  }

  getAllItemsBySearchTerm(searchTerm: string): Observable<Item[]> {
    return this.http.get<Item[]>(ITEMS_BY_SEARCH_URL + searchTerm);
  }

  getAllItemsByCategory(category: string): Observable<Item[]> {
    return this.http.get<Item[]>(ITEMS_BY_CATEGORY_URL + category);
  }

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(DELIVERIES_URL);
  }
}
