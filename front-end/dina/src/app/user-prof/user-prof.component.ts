import { UserService } from './../_services/user.service';
import { AuthenticationService } from './../_services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalInfoModel } from '../_models/personalInfo';

@Component({
  selector: 'dina-user-prof',
  templateUrl: './user-prof.component.html',
  styleUrls: ['./user-prof.component.css']
})
export class UserProfComponent implements OnInit {
  personalInfoForm: FormGroup;
  personalInfo: PersonalInfoModel = new PersonalInfoModel();
  isLoggedInUser: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
      this.personalInfoForm = fb.group({
        workExperience: [''],
        education: [''],
        personalSkills: [''],
        workExperiencePublic: [''],
        educationPublic: [''],
        personalSkillsPublic: [''],
      });
    }

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const email = params.get("email") || this.authService.currentUserValue?.email || "";
        this.isLoggedInUser = email === (this.authService.currentUserValue?.email || "");
        this.userService.getUserPersonalInfo(email).subscribe(personalInfo => this.personalInfo = personalInfo);
      });
    }

    onSubmit() {
      this.personalInfo.email = this.authService.currentUserValue?.email || "";
      this.userService.updateUserPersonalInfo(this.personalInfo).subscribe(personalInfo => this.personalInfo = personalInfo);
    }

    onMessage() {
      return;
    }
}
