import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageModel } from '../_models/message';
import { UserModel } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { ChatService } from '../_services/chat.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'dina-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() chatUserId: number;
  chattingWith: UserModel;
  messages: MessageModel[] = [];
  message: MessageModel;
  filter: any;
  messageText: string;

  constructor(
    public chat: ChatService,
    private authService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const userId = this.authService.currentUserValue?.userId || -1;
    this.route.paramMap.subscribe(params => {
      this.chatUserId = Number(params.get("chatUserId")) || this.chatUserId;
    });
    this.userService.getUserById(this.chatUserId).subscribe(user => this.chattingWith = user);
    this.chat.beginChat(userId);
    this.chat.getMessages(userId, this.chatUserId).subscribe(messages => this.messages = messages);
    this.chat.getMessage().subscribe(message => { console.log(message); this.messages.push(message); });
  }

  sendMessage() {
    if (!this.messageText.length) {
      return;
    }
    this.message = new MessageModel();
    this.message.message = this.messageText;
    this.message.senderId = this.authService.currentUserValue?.userId || -1;
    this.message.receiverId = this.chattingWith.userId;
    this.message.date = new Date();
    this.messageText = ''
    this.chat.sendMessage(this.message)
  }
}
