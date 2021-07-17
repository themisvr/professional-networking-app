import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private loggedIn: boolean = false;
  private admin: boolean = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    const currentUser: Nullable<User> = this.authService.currentUserValue;
    this.loggedIn = currentUser != null;
    this.admin = this.loggedIn && (currentUser || false) && currentUser.isAdmin;
    this.authService.currentUser.subscribe(user => this.loggedIn = user != null);
  }


  get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  get isAdmin(): boolean {
    return this.admin;
  }
}
