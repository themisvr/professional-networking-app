import { CommentModel } from './../_models/comment';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';


@Component({
  selector: 'dina-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentModel;
  avatar: string = "url('https://material.angular.io/assets/img/examples/shiba1.jpg')";

  constructor(private userService: UserService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.userService.getAvatar(this.comment.userId)
      .subscribe(
        userAvatar => {
          if (userAvatar.size) {
            const imageUrl = URL.createObjectURL(userAvatar);
            this.avatar = `url(${imageUrl}`;
          }
        },
        error => this.alertService.errorResponse(error),
      );
  }

}
