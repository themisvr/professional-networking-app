import { Component, Input, OnInit } from '@angular/core';
import { JobPostModel } from '../_models/jobPost';
import {AuthenticationService } from '../_services/authentication.service';
import { JobPostService } from '../_services/jobPost.service';

@Component({
  selector: 'dina-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {
  @Input() jobPost: JobPostModel;
  @Input() showApply: boolean = true;
  isLoggedUser: boolean = false;

  constructor(private authService: AuthenticationService, private jobPostService: JobPostService) {}

  ngOnInit() {
    this.isLoggedUser = (this.authService.currentUserValue?.userId || -1) === this.jobPost.posterId;
  }

  onApply() {
    const email = this.authService.currentUserValue?.email || "";
    this.jobPostService.applyToJob(email, this.jobPost.jobPostId).subscribe(() => console.log("Applied for the job"));
  }
}
