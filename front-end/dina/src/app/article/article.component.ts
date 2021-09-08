import { CommentModel } from './../_models/comment';
import { ArticleService } from './../_services/article.service';
import { Component, Input, OnInit } from '@angular/core';
import { ArticleModel } from '../_models/article';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'dina-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: ArticleModel;
  newComment: string;

  constructor(private authService: AuthenticationService,
              private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  onLike() {
    let toSend = { ...this.article };
    ++toSend.likes;
    this.articleService.updatePost(toSend).subscribe(article => this.article = article);
  }

  onComment(comment: string) {
    let toSend = { ...this.article };
    let newComment = new CommentModel();
    newComment.comment = comment;
    newComment.postId = this.article.postId;
    newComment.userId = this.authService.currentUserValue?.userId || -1;
    newComment.date = new Date();
    toSend.comments.push(newComment);
    this.newComment = "";
    this.articleService.updatePost(toSend).subscribe(article => this.article = article);
  }
}
