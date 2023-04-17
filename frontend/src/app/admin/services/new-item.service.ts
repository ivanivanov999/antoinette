import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN_URL } from 'src/app/shared/constants/urls';
import { ItemUpload } from 'src/app/shared/models/item-upload';

@Injectable({
  providedIn: 'root'
})
export class NewItemService {

  constructor(private http: HttpClient) { }

  create(formValue: FormData): Observable<FormData> {
    return this.http.post<FormData>(ADMIN_URL + 'newitem', formValue);
  }
}
