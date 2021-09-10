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

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onView(email: string) {
    this.router.navigate(['/personalInfo', { email: email }]);
  }

  onAccept(userId: number) {
    return;
  }

  onReject(userId: number) {
    return;
  }
}
