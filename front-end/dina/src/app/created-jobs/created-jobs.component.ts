import { Component, OnInit } from '@angular/core';
import { JobPostModel } from '../_models/jobPost';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'dina-created-jobs',
  templateUrl: './created-jobs.component.html',
  styleUrls: ['./created-jobs.component.css']
})
export class CreatedJobsComponent implements OnInit {
  jobPosts: JobPostModel[] = [];

  constructor(private authService: AuthenticationService, private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    const email = this.authService.currentUserValue?.email || "";
    this.userService.getUserCreatedJobs(email)
      .subscribe(
        jobPosts => this.jobPosts = jobPosts,
        error => this.alertService.errorResponse(error)
      );
  }
}
