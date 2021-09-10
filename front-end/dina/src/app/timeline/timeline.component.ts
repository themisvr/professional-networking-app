import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../_models/article';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service'

@Component({
  selector: 'dina-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  articles: ArticleModel[];

  constructor(private userService: UserService, private authService: AuthenticationService, private alertService: AlertService) { }

  ngOnInit(): void {
    const email = this.authService.currentUserValue?.email || "";
    this.userService.getUserPosts(email)
      .subscribe(_articles => {
        this.articles = _articles;
      });
  }
}
