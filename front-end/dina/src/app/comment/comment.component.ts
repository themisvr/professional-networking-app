import { CommentModel } from './../_models/comment';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'dina-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentModel;
  
  constructor() {}

  ngOnInit(): void {
  }

}
