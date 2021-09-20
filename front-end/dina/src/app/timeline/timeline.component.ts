import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../_models/article';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service'
import { ArticleService } from '../_services/article.service';

@Component({
  selector: 'dina-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  articles: ArticleModel[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private alertService: AlertService,
    private articleService: ArticleService
  ){ }

  ngOnInit(): void {
    const email = this.authService.currentUserValue?.email || "";
    this.userService.getUserPosts(email)
      .subscribe(
        articles => {
          for (let article of articles) {
            article.multimedia = [];
            this.articleService.getPostMedia(article.postId)
              .subscribe(
                media => {
                  if (media.size) {
                    article.multimedia.push(media);
                  }
                  this.articles.push(article);
                },
                error => this.alertService.errorResponse(error),
              );
          }
        },
        error => this.alertService.errorResponse(error)
      );
  }
}
