import { Component, Input, OnInit } from '@angular/core';
import { JobPostModel } from '../_models/jobPost';
import { UserService } from '../_services/user.service';
import {AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'dina-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {
  @Input() jobPost: JobPostModel;
  isLoggedUser: boolean = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.isLoggedUser = (this.authService.currentUserValue?.userId || -1) === this.jobPost.posterId;
  }
}
