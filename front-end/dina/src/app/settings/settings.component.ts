import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'dina-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: FormGroup;
  submitted = false;
  hide = true;
  selectedCheckbox = -1;
  changeEmailModel = {
    newEmail: null
  };
  matcher = new SamePasswordErrorStateMatcher();

  constructor(private fb: FormBuilder) {
    this.settings = fb.group({
      email: ['', [Validators.required, Validators.email]],
      changeEmailPassword: ['', [Validators.required]],
      password: [''],
      confirmPassword: [''],
    });
  }

  ngOnInit(): void {
  }

  get form() {
    return this.settings;
  }

  get formFields() {
    return this.settings.controls;
  }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    return null;
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

}

class SamePasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}