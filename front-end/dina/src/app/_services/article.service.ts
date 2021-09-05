import { Article } from './../_models/article';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  updatePost(article: Article) {
    return this.http.put<Article>(`${environment.backendUrl}/posts/${article.postId}`, article);
  }

}
