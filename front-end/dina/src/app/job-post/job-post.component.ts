import { Component, OnInit } from '@angular/core';
import { JobPostModel } from '../_models/jobPost';
import { UserService } from '../_services/user.service';
import {AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'dina-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {
  jobPosts: JobPostModel[] = [];

  constructor(private authService: AuthenticationService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    const email = this.authService.currentUserValue?.email || "";
    this.userService.getUserJobPosts(email).subscribe(jobPosts => this.jobPosts = jobPosts);
  }
}
