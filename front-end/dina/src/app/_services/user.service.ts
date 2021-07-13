import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "../_models/user"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    this.http.get<User[]>(`${environment.backendUrl}/users`);
  }

  getUserByEmaiL(email: string) {
    this.http.get<User>(`${environment.backendUrl}/users`, {
      params: {
        email: email
      }
    });
  }
}
