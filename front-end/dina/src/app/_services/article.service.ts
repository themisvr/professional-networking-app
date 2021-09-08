import { ArticleModel } from './../_models/article';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  updatePost(article: ArticleModel) {
    return this.http.put<ArticleModel>(`${environment.backendUrl}/posts/${article.postId}`, article);
  }

  createPost(article: ArticleModel) {
    return this.http.post<ArticleModel>(`${environment.backendUrl}/users/posts`, article);
  }

}
