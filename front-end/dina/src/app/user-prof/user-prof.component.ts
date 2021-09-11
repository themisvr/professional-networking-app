import { UserService } from './../_services/user.service';
import { AuthenticationService } from './../_services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalInfoModel } from '../_models/personalInfo';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'dina-user-prof',
  templateUrl: './user-prof.component.html',
  styleUrls: ['./user-prof.component.css']
})
export class UserProfComponent implements OnInit {
  personalInfoForm: FormGroup;
  personalInfo: PersonalInfoModel = new PersonalInfoModel();
  isLoggedInUser: boolean = false;
  isConnectedUser: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private alertService: AlertService) {
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
        this.userService
          .getUserNetwork(this.authService.currentUserValue?.email || "")
          .subscribe(connectedUsers => {
            this.isConnectedUser = connectedUsers.find((user) => user.email === email) ? true : false;
          });

        this.userService
          .getUserPersonalInfo(email)
          .subscribe(personalInfo => this.personalInfo = personalInfo);
      });
    }

    onSubmit() {
      this.userService.updateUserPersonalInfo(this.personalInfo).subscribe(personalInfo => this.personalInfo = personalInfo);
    }

    onMessage() {
      return;
    }

    onConnect() {
      const connectorId = this.authService.currentUserValue?.userId || -1;
      this.userService.connect(connectorId, this.personalInfo.userId)
        .subscribe(
          () => this.alertService.success("Connection request sent successfully"),
          error => this.alertService.errorResponse(error)
        );
    }
}
