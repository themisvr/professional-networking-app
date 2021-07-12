import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TimelineComponent } from './timeline/timeline.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    WelcomePageComponent,
    TimelineComponent,
    SidebarComponent,
    FooterComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
