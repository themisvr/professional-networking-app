import { UserService } from './../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';



@Component({
  selector: 'app-user-prof',
  templateUrl: './user-prof.component.html',
  styleUrls: ['./user-prof.component.css']
})
export class UserProfComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

}
