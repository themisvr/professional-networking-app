import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { checkPasswords, SamePasswordErrorStateMatcher } from '../_helpers/utils';
import { ChangeEmailModel } from '../_models/changeEmail';
import { ChangePasswordModel } from '../_models/changePassword';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'dina-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterViewInit {
  @ViewChild('changeEmailCheckbox') changeEmailCheckbox: MatCheckbox;
  @ViewChild('changePasswordCheckbox') changePasswordCheckbox: MatCheckbox;
  _checkboxFormMap: Map<MatCheckbox, FormGroup>;

  changeEmailForm: FormGroup;
  changePasswordForm: FormGroup;
  submitted = false;
  hidePassword = true;
  selectedCheckbox = -1;
  matcher = new SamePasswordErrorStateMatcher();
  changeEmailModel: ChangeEmailModel = new ChangeEmailModel();
  changePasswordModel: ChangePasswordModel = new ChangePasswordModel();

  _initMap() {
    this._checkboxFormMap = new Map<MatCheckbox, FormGroup>();
    this._checkboxFormMap.set(this.changeEmailCheckbox, this.changeEmailForm);
    this._checkboxFormMap.set(this.changePasswordCheckbox, this.changePasswordForm);
  }

  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthenticationService) {
    this.changeEmailForm = fb.group({
      newEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.changePasswordForm = fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: [''],
    }, {validators: (group) => checkPasswords(group, 'newPassword', 'confirmPassword')});
  }

  ngAfterViewInit(): void {
    this._initMap();
  }

  get emailForm() {
    return this.changeEmailForm;
  }

  get passwordForm() {
    return this.changePasswordForm;
  }

  get emailFormFields() {
    return this.changeEmailForm.controls;
  }

  get passwordFormFields() {
    return this.changePasswordForm.controls;
  }

  onCheckBoxChanged(e: MatCheckboxChange) {
    let editingCheckbox = e.source.id === this.changeEmailCheckbox.id
      ? this.changeEmailCheckbox
      : this.changePasswordCheckbox;

    let secondaryCheckbox = e.source.id === this.changeEmailCheckbox.id
      ? this.changePasswordCheckbox
      : this.changeEmailCheckbox;

    if (editingCheckbox.checked) {
      secondaryCheckbox.checked = false;
    }

    let associatedForm = this._checkboxFormMap.get(secondaryCheckbox);
    if (associatedForm) {
      associatedForm.reset();
    }
  }

  onSubmit() {
    if (this.changeEmailCheckbox.checked) {
      this.onChangeEmailFormSubmit();
    } else {
      this.onChangePasswordFormSubmit();
    }
  }

  onChangeEmailFormSubmit() {
    this.submitted = true;
    if (this.changeEmailForm.invalid) {
      return;
    }

    this.changeEmailModel.email = this.authService.currentUserValue?.email || "";
    this.userService.changeUserEmail(this.changeEmailModel)
    .subscribe(
      () => {},
      error => {
        // TODO(gliontos): Properly handle errors
      }
    );
  }

  onChangePasswordFormSubmit() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.changePasswordModel.email = this.authService.currentUserValue?.email || "";
      this.userService.changeUserPassword(this.changePasswordModel)
      .subscribe(
        () => {},
        error => {
          // TODO(gliontos): Properly handle errors
        }
      );
  }
}