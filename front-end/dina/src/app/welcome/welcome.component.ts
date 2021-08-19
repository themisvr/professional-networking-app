import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../_models/article';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  dummyArticle: Article;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.dummyArticle = new Article;
    this.dummyArticle.creator = "George Liontos";
    this.dummyArticle.created = new Date();
    this.dummyArticle.content = "Hello World";
    this.dummyArticle.likes = 10;
    this.dummyArticle.comments = ["Good Job"];
    this.navigateIfAlreadyLoggedIn();
  }

  private navigateIfAlreadyLoggedIn() {
    const currentUser: Nullable<User> = this.authenticationService.currentUserValue;
    if (currentUser) {
      if (currentUser.isAdmin === true) {
        this.router.navigate(['admin'])
      }
      else {
        this.router.navigate(['home']);
      }
    }
  }
}
