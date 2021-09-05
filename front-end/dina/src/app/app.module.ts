import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TimelineComponent } from './timeline/timeline.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserProfComponent } from './user-prof/user-prof.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoutComponent } from './logout/logout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SettingsComponent } from './settings/settings.component';
import { ArticleComponent } from './article/article.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChatComponent } from './chat/chat.component';
import { NetworkComponent } from './network/network.component';
import { JobPostComponent } from './job-post/job-post.component';
import { JobsComponent } from './jobs/jobs.component';
import { SearchComponent } from './search/search.component';
import { SearchListComponent } from './search-list/search-list.component';
import { AvailableJobsComponent } from './available-jobs/available-jobs.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { CreatedJobsComponent } from './created-jobs/created-jobs.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { JobApplicantsComponent } from './job-applicants/job-applicants.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TimelineComponent,
    FooterComponent,
    AdminPageComponent,
    UserProfComponent,
    HeaderComponent,
    NavbarComponent,
    NotFoundComponent,
    UserHomeComponent,
    WelcomeComponent,
    LogoutComponent,
    SettingsComponent,
    ArticleComponent,
    ChatComponent,
    NetworkComponent,
    JobPostComponent,
    JobsComponent,
    SearchComponent,
    SearchListComponent,
    AvailableJobsComponent,
    AppliedJobsComponent,
    CreatedJobsComponent,
    CreateJobComponent,
    JobApplicantsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableExporterModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
