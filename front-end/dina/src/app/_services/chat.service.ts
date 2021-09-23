import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { MessageModel } from '../_models/message';
import { UserModel } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socket: Socket, private http: HttpClient) { }

  beginChat(userId: number) {
    this.socket.emit("begin", userId);
  }

  sendMessage(message: MessageModel) {
    this.socket.emit("message", message);
  }

  getMessagedUsers(userId: number) {
    return this.http.get<UserModel[]>(`${environment.backendUrl}/chat/messagedUsers/${userId}`);
  }

  getMessages(firstUserId: number, secondUserId: number) {
    return this.http.get<MessageModel[]>(`${environment.backendUrl}/chat/messages`, {
      params: {
        first: firstUserId,
        second: secondUserId,
      }
    });
  }

  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data: any) => data));
  }
}
