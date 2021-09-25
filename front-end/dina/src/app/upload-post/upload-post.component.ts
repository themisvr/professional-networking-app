import { ArticleService } from './../_services/article.service';
import { ArticleModel } from './../_models/article';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';


@Component({
  selector: 'dina-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.css']
})
export class UploadPostComponent implements OnInit {
  createArticleForm: FormGroup;
  articleModel: ArticleModel = new ArticleModel();
  submitted: boolean = false;
  selectedFile: any = null;

  constructor(private authService: AuthenticationService,
              private articleService: ArticleService,
              private alertService: AlertService,
              private formBuilder: FormBuilder) {
    this.createArticleForm = this.formBuilder.group({
      articleContent: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get formFields() {
    return this.createArticleForm.controls;
  }

  get form() {
    return this.createArticleForm;
  }

  onUpload() {
    this.submitted = true;

    if (this.createArticleForm.invalid) {
      return;
    }

    this.articleModel.userId = this.authService.currentUserValue?.userId || -1;

    this.articleService.createPost(this.articleModel)
      .subscribe(
        article => {
          this.articleModel = article;
          if (this.selectedFile !== null) {
            const multimedia = new FormData();
            multimedia.append('multimedia', this.selectedFile, this.selectedFile.name);
            this.articleService.uploadPostMedia(this.articleModel.postId, multimedia)
              .subscribe(
                article => {
                  this.articleModel = article;
                  window.location.reload();
                  this.alertService.success("Post created successfully");
                },
                error => this.alertService.errorResponse(error),
              );
          } else {
            window.location.reload();
            this.alertService.success("Post created successfully");
          }
        },
        error => this.alertService.errorResponse(error),
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

}
