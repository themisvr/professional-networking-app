import { RegisterUser } from './../_models/registerUser';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Nullable<User>>;
  public currentUser: Observable<Nullable<User>>;

  constructor(private http: HttpClient) {
    let storageUser = localStorage.getItem('currentUser');
    if (storageUser) {
      this.currentUserSubject = new BehaviorSubject<Nullable<User>>(JSON.parse(storageUser));
    } else {
      this.currentUserSubject = new BehaviorSubject<Nullable<User>>(null);
    }

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Nullable<User> {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.backendUrl}/auth/login`, {email, password})
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(user: RegisterUser) {
    return this.http.post<User>(`${environment.backendUrl}/auth/register`, user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
