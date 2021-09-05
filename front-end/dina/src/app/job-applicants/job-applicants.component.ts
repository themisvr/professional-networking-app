import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { JobPostService } from '../_services/jobPost.service';

@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.css']
})
export class JobApplicantsComponent implements OnInit {
  applicants: User[] = [];

  constructor(private jobPostService: JobPostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const jobPostId = Number(params.get("jobPostId")) || -1;
      this.jobPostService.getJobApplicants(jobPostId).subscribe(applicants => this.applicants = applicants);
    });
  }

}
