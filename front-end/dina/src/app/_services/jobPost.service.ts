import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../_models/user';


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

  getJobApplicants(jobPostId: number) {
    return this.http.get<UserModel[]>(`${environment.backendUrl}/jobPosts/${jobPostId}/applicants`);
  }
}
