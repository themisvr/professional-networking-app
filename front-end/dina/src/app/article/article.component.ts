import { ArticleService } from './../_services/article.service';
import { Component, Input, OnInit } from '@angular/core';
import { ArticleModel } from '../_models/article';

@Component({
  selector: 'dina-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: ArticleModel;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  onLike() {
    let toSend = { ...this.article };
    ++toSend.likes;
    this.articleService.updatePost(toSend).subscribe(article => this.article = article);
  }

}
