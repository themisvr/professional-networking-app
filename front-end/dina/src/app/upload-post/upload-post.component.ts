import { Router } from '@angular/router';
import { ArticleService } from './../_services/article.service';
import { ArticleModel } from './../_models/article';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';



@Component({
  selector: 'dina-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.css']
})
export class UploadPostComponent implements OnInit {
  createArticleForm: FormGroup;
  articleModel: ArticleModel = new ArticleModel();
  submitted: boolean = false;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private articleService: ArticleService,
              private formBuilder: FormBuilder) {
    this.createArticleForm = this.formBuilder.group({
      articleContent: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onUpload() {
    this.submitted = true;

    if (this.createArticleForm.invalid) {
      return;
    }

    this.articleModel.userId = this.authService.currentUserValue?.userId || -1;
    this.articleService.createPost(this.articleModel).subscribe(
      article => { this.articleModel = article }
    );
  }

  get formFields() {
    return this.createArticleForm.controls;
  }

  get form() {
    return this.createArticleForm;
  }

}
