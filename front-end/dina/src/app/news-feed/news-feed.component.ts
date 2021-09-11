import { AuthenticationService } from './../_services/authentication.service';
import { ArticleModel } from './../_models/article';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dina-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  userArticles: ArticleModel[];

  constructor(private userService: UserService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    const email = this.authService.currentUserValue?.email || "";
    this.userService.getUserPosts(email).subscribe(articles => this.userArticles = articles);
  }

}
