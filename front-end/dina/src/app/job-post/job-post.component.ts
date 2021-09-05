import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() showApply: boolean = false;
  @Input() showApplied: boolean = false;
  @Input() showApplicants: boolean = false;

  constructor(private authService: AuthenticationService, private jobPostService: JobPostService, private router: Router) {}

  ngOnInit() {}

  onApply() {
    const email = this.authService.currentUserValue?.email || "";
    this.jobPostService.applyToJob(email, this.jobPost.jobPostId).subscribe(() => console.log("Applied for the job"));
  }

  onShowApplicants() {
    this.router.navigate(['/jobApplicants', { jobPostId: this.jobPost.jobPostId }]);
  }
}
