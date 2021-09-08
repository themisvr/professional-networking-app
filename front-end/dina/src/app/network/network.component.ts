import { UserService } from './../_services/user.service';
import { AuthenticationService } from './../_services/authentication.service';
import { ConnectionModel } from './../_models/connection';
import { UserModel } from '../_models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'dina-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  followerId: number;
  followers: ConnectionModel[] = [];

  constructor(private authService: AuthenticationService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    const email = this.authService.currentUserValue?.email || "";
    this.userService.getUserNetwork(email)
      .subscribe(followers => this.followers = followers);
  }

  onView(email: string) {
    this.router.navigate(['/personalInfo', { email: email}])
  }
}
