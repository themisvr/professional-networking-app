import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.navigateIfAlreadyLoggedIn();
  }

  private navigateIfAlreadyLoggedIn() {
    if (this.authenticationService.currentUserValue?.isAdmin === true) {
      this.router.navigate(['admin'])
    }
    else {
      this.router.navigate(['home']);
    }
  }

}
