import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  hide = true;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      if (this.authenticationService.currentUserValue.isAdmin === true) {
        this.router.navigate(['admin']);

      }
      else {
        this.router.navigate(['user-prof']);
      }
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  get formFields() {
    return this.loginForm.controls;
  }


  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.formFields.email.value, this.formFields.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (this.authenticationService.currentUserValue?.isAdmin === true) {
            this.router.navigate(['admin'])
          }
          else {
            this.router.navigate(['user-prof']);
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
