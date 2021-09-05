import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(private http: HttpClient) { }

  search(user: string) {
    return this.http.get<User[]>(`${environment.backendUrl}/search`, {
      params: {
        user: user
      }
    });
  }

}
