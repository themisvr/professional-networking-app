import { PersonalInfoModel } from './../_models/personalInfo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  followers: Array<PersonalInfoModel> = [];
  cols: number;

  constructor() { }

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
  }
}
