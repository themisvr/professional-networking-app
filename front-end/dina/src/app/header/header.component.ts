import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private loggedIn: boolean = false;

  constructor(private authService: AuthenticationService) {
    this.loggedIn = authService.currentUserValue != null;
    authService.currentUser.subscribe(user => this.loggedIn = user != null);
  }

  ngOnInit(): void {
  }


  get isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
