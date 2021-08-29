import { UserService } from './../_services/user.service';
import { AuthenticationService } from './../_services/authentication.service';
import { PersonalInfoModel } from './../_models/personalInfo';
import { User } from '../_models/user'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  followers: PersonalInfoModel[] = [];
  user: User = new User();

  constructor(private authService: AuthenticationService,
              private userService: UserService) { }

  ngOnInit(): void {
    for (let i = 0; i != 5; i++) {
      let testObj = new PersonalInfoModel();
      testObj.email = "ggeohotliontos@dina.com";
      testObj.education = "DI";
      testObj.educationPublic = true;
      testObj.workExperience = "Software Engineer at SG Digital";
      testObj.workExperiencePublic = true;
      testObj.personalSkills = "Team Player";
      testObj.personalSkillsPublic = true;
      this.followers.push(testObj);
    }

    const email = this.authService.currentUserValue?.email || "";
    this.userService.getUserNetwork(email).subscribe(user => this.user = user);
    console.log(this.user)
  }
}
