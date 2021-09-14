import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';


@Injectable({ providedIn: 'root' })
export class AdminService {
    private httpOptions = {
        headers: new HttpHeaders({
            'Accept': 'text/html, application/xhtml+xml, */*',
        }),
        responseType: 'text' as 'json',
        observe: 'response' as 'body'
    };

    constructor(private http: HttpClient) { }

    exportUserData(userIds: number[], method: string) {
        return this.http.post<any>(`${environment.backendUrl}/admin/exportUserData`, {
            method: method,
            userIds: userIds,
        }, this.httpOptions).pipe(map((resp: Response) => resp.body));
    }
}
