import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN_NEW_CATEGORY } from 'src/app/shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class NewCategoryService {

  constructor(private http: HttpClient) { }

  create(formValue: FormData): Observable<FormData> {
    return this.http.post<FormData>(ADMIN_NEW_CATEGORY, formValue);
  }
}
