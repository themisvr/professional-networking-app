import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment.prod';


@Injectable({ providedIn: 'root' })
export class AdminService {
    constructor(private http: HttpClient) {}

    exportUserData(userIds: number[], method: string) {
        return this.http.post<any>(`${environment.backendUrl}/admin/exportUserData`, {
            method: method,
            userIds: userIds,
        });
    }
}
