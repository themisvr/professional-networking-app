import { UserService } from './../_services/user.service';
import { AuthenticationService } from './../_services/authentication.service';
import { ConnectionModel } from './../_models/connection';
import { User } from '../_models/user'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dina-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  followers: ConnectionModel[] = [];

  constructor(private authService: AuthenticationService,
              private userService: UserService) { }

  ngOnInit() {
    const email = this.authService.currentUserValue?.email || "";
    this.userService.getUserNetwork(email)
      .subscribe(followers => this.followers = followers);
  }
}
