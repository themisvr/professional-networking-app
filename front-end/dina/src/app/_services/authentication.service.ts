import { Router, ROUTES, RoutesRecognized } from '@angular/router';
import { RegisterUserModel } from './../_models/registerUser';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../_models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Nullable<UserModel>>;
  public currentUser: Observable<Nullable<UserModel>>;

  constructor(private http: HttpClient, private router: Router) {
    let storageUser = localStorage.getItem('currentUser');
    if (storageUser) {
      this.currentUserSubject = new BehaviorSubject<Nullable<UserModel>>(JSON.parse(storageUser));
    } else {
      this.currentUserSubject = new BehaviorSubject<Nullable<UserModel>>(null);
    }

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Nullable<UserModel> {
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

  register(user: RegisterUserModel) {
    return this.http.post<UserModel>(`${environment.backendUrl}/auth/register`, user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
