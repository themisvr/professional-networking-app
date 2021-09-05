import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "../_models/user"
import { Article} from "../_models/article";
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
    return this.http.get<User[]>(`${environment.backendUrl}/users`);
  }

  getUserByEmail(email: string) {
    return this.http.get<User>(`${environment.backendUrl}/users`, {
      params: {
        email: email
      }
    });
  }

  getUserPosts(email: string) {
    return this.http.get<Article[]>(`${environment.backendUrl}/users/posts`, {
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

  getUserJobPosts(email: string) {
    return this.http.get<JobPostModel[]>(`${environment.backendUrl}/users/jobPosts`, {
      params: {
        email: email
      }
    });
  }
}
