import { RegisterUser } from './../_models/registerUser';
import { Router } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserModel: RegisterUser = new RegisterUser();
  registerForm: FormGroup;
  submitted = false;
  hide = true;
  matcher = new SamePasswordErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      password: ['', Validators.required],
      confirmPassword: [''],
    }, { validators: this.checkPasswords });
  }

  get formFields() {
    return this.registerForm.controls;
  }

  get form() {
    return this.registerForm;
  }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerUserModel);
    this.authService.register(this.registerUserModel)
      .pipe(first())
      .subscribe(
        _data => {
          this.router.navigate(['login']);
        },
        error => {
          // TODO(gliontos): Properly handle errors
          this.router.navigate(['login']);
        }
      );
  }
}

class SamePasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}