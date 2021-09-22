import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { MessageModel } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socket: Socket) { }

  beginChat(userId: number) {
    this.socket.emit("begin", userId);
  }

  sendMessage(message: MessageModel) {
    this.socket.emit("message", message);
  }

  getMessages(fromUserId: number, toUserId: number) {
    return [];
  }

  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data: any) => {console.log(data); return data;}));
  }
}
