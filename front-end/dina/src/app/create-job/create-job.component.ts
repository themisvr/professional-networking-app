import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobPostModel } from '../_models/jobPost';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'dina-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {
  createJobForm: FormGroup;
  jobPostModel: JobPostModel = new JobPostModel();
  submitted: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {
    this.createJobForm = this.formBuilder.group({
      jobTitle: ['', [Validators.required]],
      jobDescription: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;

    if (this.createJobForm.invalid) {
      return;
    }

    this.jobPostModel.posterId = this.authService.currentUserValue?.userId || -1;;
    this.userService.createJobPost(this.jobPostModel)
      .subscribe(
        jobPost => this.jobPostModel = jobPost,
        error => this.alertService.errorResponse(error),
      );
  }

  get formFields() {
    return this.createJobForm.controls;
  }

  get form() {
    return this.createJobForm;
  }
}
