import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN_NEW_ITEM } from 'src/app/shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class NewItemService {

  constructor(private http: HttpClient) { }

  create(formValue: FormData): Observable<FormData> {
    return this.http.post<FormData>(ADMIN_NEW_ITEM, formValue);
  }
}
