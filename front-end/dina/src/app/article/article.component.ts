import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../_models/article';

@Component({
  selector: 'dina-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;

  constructor() { }

  ngOnInit(): void {
  }

}
