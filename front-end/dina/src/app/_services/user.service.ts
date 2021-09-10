import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from "../_models/user"
import { ArticleModel } from "../_models/article";
import { ChangeEmailModel } from '../_models/changeEmail';
import { ChangePasswordModel } from '../_models/changePassword';
import { PersonalInfoModel } from '../_models/personalInfo';
import { ConnectionModel } from '../_models/connection';
import { JobPostModel } from '../_models/jobPost';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<UserModel[]>(`${environment.backendUrl}/users`);
  }

  getUserByEmail(email: string) {
    return this.http.get<UserModel>(`${environment.backendUrl}/users`, {
      params: {
        email: email
      }
    });
  }

  getUserPosts(email: string) {
    return this.http.get<ArticleModel[]>(`${environment.backendUrl}/users/posts`, {
      params: {
        email: email
      }
    });
  }

  changeUserEmail(changeEmailModel: ChangeEmailModel) {
    return this.http.put<any>(`${environment.backendUrl}/users/changeEmail`, changeEmailModel);
  }

  changeUserPassword(changePasswordModel: ChangePasswordModel) {
    return this.http.put<any>(`${environment.backendUrl}/users/changePassword`, changePasswordModel)
  }

  getUserPersonalInfo(email: string) {
    return this.http.get<PersonalInfoModel>(`${environment.backendUrl}/users/personalInfo`, {
      params: {
        email: email
      }
    });
  }

  updateUserPersonalInfo(personalInfo: PersonalInfoModel) {
    return this.http.post<PersonalInfoModel>(`${environment.backendUrl}/users/personalInfo`, personalInfo);
  }

  getUserNetwork(email: string) {
    return this.http.get<ConnectionModel[]>(`${environment.backendUrl}/users/network`, {
      params: {
        email: email
      }
    });
  }

  getAvailableJobs(email: string) {
    return this.http.get<JobPostModel[]>(`${environment.backendUrl}/users/availableJobs`, {
      params: {
        email: email
      }
    });
  }

  getUserAppliedJobs(email: string) {
    return this.http.get<JobPostModel[]>(`${environment.backendUrl}/users/appliedJobs`, {
      params: {
        email: email
      }
    });
  }

  getUserCreatedJobs(email: string) {
    return this.http.get<JobPostModel[]>(`${environment.backendUrl}/users/createdJobs`, {
      params: {
        email: email
      }
    });
  }

  createJobPost(jobPost: JobPostModel) {
    return this.http.post<JobPostModel>(`${environment.backendUrl}/users/createJobPost`, jobPost);
  }

  acceptConnection(acceptorId: number, userId: number) {
    return this.http.post<any>(`${environment.backendUrl}/users/${acceptorId}/acceptConnection`, {
      userId: userId
    });
  }

  rejectConnection(rejectorId: number, userId: number) {
    return this.http.post<any>(`${environment.backendUrl}/users/${rejectorId}/rejectConnection`, {
      userId: userId
    });
  }

  connect(connectorId: number, userId: number) {
    return this.http.post<any>(`${environment.backendUrl}/users/${connectorId}/connect`, {
      userId: userId
    });
  }
}
