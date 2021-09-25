import { UserService } from './../_services/user.service';
import { AuthenticationService } from './../_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  isPendingUser: boolean = false;
  fullName: string;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router) {
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
        this.fullName = this.authService.currentUserValue?.fullName || "";

        this.userService
          .getUserPersonalInfo(email)
          .subscribe(
            personalInfo => {
              this.personalInfo = personalInfo;
              if (!this.isLoggedInUser) {
                this.userService
                .getUserNetwork(this.authService.currentUserValue?.email || "")
                .subscribe(
                  connectedUsers => {
                    this.isConnectedUser = connectedUsers.find((user) => user.email === email) ? true : false;
                    if (!this.isConnectedUser) {
                      this.userService.getConnectionRequests(personalInfo.userId)
                        .subscribe(
                          pendingRequests => {
                            const myEmail = this.authService.currentUserValue?.email || "";
                            this.isPendingUser = pendingRequests.find(pendingUser => pendingUser.email === myEmail) ? true : false;
                          },
                          error => this.alertService.errorResponse(error),
                        );
                    }
                  },
                  error => {
                    this.alertService.error("An error occured while retrieving user network");
                    this.alertService.errorResponse(error);
                  }
                );
              }

            },
            error => this.alertService.errorResponse(error),
          );
      });
    }

    onUpdate() {
      this.userService.updateUserPersonalInfo(this.personalInfo)
        .subscribe(
          personalInfo => {
            this.personalInfo = personalInfo;
            this.alertService.success("Personal info updated successfully");
          },
          error => this.alertService.errorResponse(error),
        );
    }

    onMessage() {
      this.router.navigate(['/chat', {chatUserId: this.personalInfo.userId}]);
    }

    onConnect() {
      const connectorId = this.authService.currentUserValue?.userId || -1;
      this.userService.connect(connectorId, this.personalInfo.userId)
        .subscribe(
          () => {
            this.isPendingUser = true;
            this.alertService.success("Connection request sent successfully");
          },
          error => this.alertService.errorResponse(error)
        );
    }
}
