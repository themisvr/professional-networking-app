import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { JobPostModel } from '../_models/jobPost';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  // jobPosts: JobPostModel[] = [];

  constructor(private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
    // const email = this.authService.currentUserValue?.email || "";
    // this.userService.getUserJobPosts(email).subscribe(jobPosts => this.jobPosts = jobPosts);
  }
}
