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
  users: UserModel[] = [];
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
      this.chat.getMessagedUsers(userId).subscribe(users => {
        this.users = users;
        if (!this.chatUserId) {
          this.chatUserId = this.users[0].userId;
        }
        const chattingUser = this.users.find(user => user.userId == this.chatUserId);
        if (!chattingUser) {
          this.userService.getUserById(this.chatUserId).subscribe(user => this.chattingWith = user);
        } else {
          this.chattingWith = chattingUser;
        }
        this.chat.beginChat(userId);
        this.chat.getMessages(userId, this.chatUserId).subscribe(messages => this.messages = messages);
        this.chat.getMessage().subscribe(message => this.messages.push(message));
      });
    });

    // this.chat.getMessagedUsers(userId).subscribe(users => {
    //   this.users = users;
    //   if (!this.chatUserId) {
    //     this.chatUserId = this.users[0].userId;
    //   }
    //   this.chattingWith = this.users.find(user => user.userId == this.chatUserId) || new UserModel;
    //   this.chat.beginChat(userId);
    //   this.chat.getMessages(userId, this.chatUserId).subscribe(messages => this.messages = messages);
    //   this.chat.getMessage().subscribe(message => this.messages.push(message));
    // });
  }

  sendMessage() {
    if (!this.messageText.length) {
      return;
    }

    if (!this.users.find(user => user.userId === this.chattingWith.userId)) {
      this.users.push(this.chattingWith);
    }

    this.message = new MessageModel();
    this.message.message = this.messageText;
    this.message.senderId = this.authService.currentUserValue?.userId || -1;
    this.message.receiverId = this.chattingWith.userId;
    this.message.date = new Date();
    this.messageText = ''
    this.chat.sendMessage(this.message)
  }

  onSelectedUser(selectedUserId: number) {
    this.chatUserId = selectedUserId;
    this.chattingWith = this.users.find(user => user.userId == this.chatUserId) || new UserModel;
    this.messageText = '';
    const userId = this.authService.currentUserValue?.userId || -1;
    this.chat.getMessages(userId, selectedUserId).subscribe(messages => this.messages = messages);
  }
}
