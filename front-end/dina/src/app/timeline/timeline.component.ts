import { Component, OnInit } from '@angular/core';
import { Article } from '../_models/article';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'dina-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  articles: Article[];

  constructor(private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    const email = this.authService.currentUserValue?.email || "";
    this.userService.getUserPosts(email)
      .subscribe(_articles => {
        console.log(_articles);
        this.articles = _articles
      });
  }
}
