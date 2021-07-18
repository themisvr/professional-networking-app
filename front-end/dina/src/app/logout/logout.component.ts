import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['welcome']);
  }
}
