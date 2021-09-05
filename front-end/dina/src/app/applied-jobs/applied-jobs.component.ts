import { Component, OnInit } from '@angular/core';
import { JobPostModel } from '../_models/jobPost';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'dina-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {
  jobPosts: JobPostModel[] = [];

  constructor(private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
    const email = this.authService.currentUserValue?.email || "";
    this.userService.getUserAppliedJobs(email).subscribe(jobPosts => this.jobPosts = jobPosts);
  }
}
