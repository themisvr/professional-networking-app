import { CommentModel } from './../_models/comment';
import { ArticleService } from './../_services/article.service';
import { Component, Input, OnInit } from '@angular/core';
import { ArticleModel } from '../_models/article';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'dina-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: ArticleModel;
  imageUrls: SafeUrl[] = [];
  newComment: string;

  constructor(private authService: AuthenticationService,
              private articleService: ArticleService,
              private alertService: AlertService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.articleService.getPostMedia(this.article.postId)
      .subscribe(
        media => {
          this.article.multimedia = [];
          if (media.size) {
            this.article.multimedia.push(media);
          }
          for (let media of this.article.multimedia) {
            const unsafeImageUrl = URL.createObjectURL(media);
            this.imageUrls.push(this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl));
          }
        },
        error => this.alertService.errorResponse(error),
      );
  }

  onLike() {
    this.articleService.like(this.article.postId, this.authService.currentUserValue?.userId || -1)
      .subscribe(
        article => this.article = article,
        error => this.alertService.errorResponse(error),
      );
  }

  onComment(comment: string) {
    let newComment = new CommentModel();
    newComment.comment = comment;
    newComment.postId = this.article.postId;
    newComment.userId = this.authService.currentUserValue?.userId || -1;
    newComment.date = new Date();
    this.newComment = "";
    this.articleService.addComment(this.article.postId, newComment)
      .subscribe(
        article => this.article = article,
        error => this.alertService.errorResponse(error),
      );
  }
}
