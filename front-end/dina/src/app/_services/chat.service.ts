import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { MessageModel } from '../_models/message';

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

  getMessages(firstUserId: number, secondUserId: number) {
    return this.http.get<MessageModel[]>(`${environment.backendUrl}/chat/messages`, {
      params: {
        first: firstUserId,
        second: secondUserId,
      }
    });
  }

  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data: any) => {console.log(data); return data;}));
  }
}
