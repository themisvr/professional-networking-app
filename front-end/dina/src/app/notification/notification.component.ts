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
              private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onView(email: string) {
    this.router.navigate(['/personalInfo', { email: email }]);
  }

  onAccept(userId: number) {
    this.userService.acceptConnection(this.authService.currentUserValue?.userId || -1, userId);
  }

  onReject(userId: number) {
    this.userService.rejectConnection(this.authService.currentUserValue?.userId || -1, userId);
  }
}
