import { AlertService } from './../_services/alert.service';
import { AuthenticationService } from './../_services/authentication.service';
import { UserService } from './../_services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../_models/user';

@Component({
  selector: 'dina-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  requestedConnections: UserModel[];

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthenticationService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.userService.getConnectionRequests(this.authService.currentUserValue?.userId || -1).subscribe(users => this.requestedConnections = users);
  }

  onView(email: string) {
    this.router.navigate(['/personalInfo', { email: email }]);
  }

  onAccept(userId: number, username: string) {
    this.userService.acceptConnection(this.authService.currentUserValue?.userId || -1, userId).subscribe(() => {});
    const pendingUserIndex = this.requestedConnections.findIndex(user => user.userId === userId);
    if (pendingUserIndex !== -1) {
      this.requestedConnections.splice(pendingUserIndex, 1);
    }
    this.alertService.success(`You are are now connected with ${username}`);
  }

  onReject(userId: number, username: string) {
    this.userService.rejectConnection(this.authService.currentUserValue?.userId || -1, userId).subscribe(() => {});
    const pendingUserIndex = this.requestedConnections.findIndex(user => user.userId === userId);
    if (pendingUserIndex !== -1) {
      this.requestedConnections.splice(pendingUserIndex, 1);
    }
    this.alertService.error(`You rejected connection with ${username}`);
  }
}
