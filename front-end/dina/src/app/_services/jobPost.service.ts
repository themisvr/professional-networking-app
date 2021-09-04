import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JobPostService {

  constructor(private http: HttpClient) {}

  applyToJob(email: string, jobPostId: number) {
    return this.http.post(`${environment.backendUrl}/jobPosts/${jobPostId}/apply`, {
      email: email
    });
  }
}
