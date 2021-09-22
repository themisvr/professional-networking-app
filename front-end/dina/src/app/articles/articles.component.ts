import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../_models/article';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'dina-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: ArticleModel[] = [];

  constructor(private userService: UserService,
    private authService: AuthenticationService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    const email = this.authService.currentUserValue?.email || "";
    this.userService.getUserPosts(email)
      .subscribe(
        articles => this.articles = articles,
        error => this.alertService.errorResponse(error)
      );
  }
}
