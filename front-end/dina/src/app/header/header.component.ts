import { Component, OnInit } from '@angular/core';
import { UserModel } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  admin: boolean = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.loggedIn = user != null;
      this.admin = (user || false) && user.isAdmin;
    });
  }
}
