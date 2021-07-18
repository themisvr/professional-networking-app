import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  hide = true;
  submitted = false;
  error: string;

  Username: FormControl;
  Password: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.navigateIfAlreadyLoggedIn();
  }

  get formFields() {
    return this.loginForm.controls;
  }

  private navigateIfAlreadyLoggedIn() {
    const currentUser: Nullable<User> = this.authenticationService.currentUserValue;
    if (currentUser?.isAdmin === true) {
      this.router.navigate(['admin'])
    }
    else {
      this.router.navigate(['home']);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.formFields.email.value, this.formFields.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.navigateIfAlreadyLoggedIn();
        },
        error => {
          this.error = error;
        });
  }
}
