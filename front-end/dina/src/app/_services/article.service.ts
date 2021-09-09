import { ArticleModel } from './../_models/article';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { CommentModel } from '../_models/comment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  like(postId: number, userId: number) {
    return this.http.put<ArticleModel>(`${environment.backendUrl}/posts/${postId}/like`, { userId: userId });
  }

  addComment(postId: number, comment: CommentModel) {
    return this.http.post<ArticleModel>(`${environment.backendUrl}/posts/${postId}/addComment`, comment);
  }

  createPost(article: ArticleModel) {
    return this.http.post<ArticleModel>(`${environment.backendUrl}/users/posts`, article);
  }
}
