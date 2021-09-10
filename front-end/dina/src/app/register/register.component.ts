import { RegisterUserModel } from './../_models/registerUser';
import { Router } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';
import { AlertService } from './../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {checkPasswords, SamePasswordErrorStateMatcher} from '../_helpers/utils';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserModel: RegisterUserModel = new RegisterUserModel();
  registerForm: FormGroup;
  submitted = false;
  hide = true;
  matcher = new SamePasswordErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      password: ['', Validators.required],
      confirmPassword: [''],
    }, { validators: (group) => checkPasswords(group, 'password', 'confirmPassword') });
  }

  get formFields() {
    return this.registerForm.controls;
  }

  get form() {
    return this.registerForm;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.registerUserModel)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['login']);
          this.alertService.success("Registered successfully");
        },
        error => {
          this.alertService.errorResponse(error);
        }
      );
  }
}