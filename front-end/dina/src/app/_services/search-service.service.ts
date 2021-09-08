import { UserModel } from './../_models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(private http: HttpClient) { }

  search(searchTerm: string) {
    return this.http.get<UserModel[]>(`${environment.backendUrl}/search`, {
      params: {
        term: searchTerm
      }
    });
  }

}
