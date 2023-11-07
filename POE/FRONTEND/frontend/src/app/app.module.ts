//Referencing:
//The Independent Institute of Education. 2023. APDS7311 Lab Guide.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { AppComponent } from './app.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { PostDisplayComponent } from './post/post-display/post-display.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LoginComponent } from './auth/login/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorinterceptorInterceptor } from './error/error.interceptor';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    PostDisplayComponent,
    LoginComponent,
    ErrorComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
            {provide: HTTP_INTERCEPTORS, useClass: ErrorinterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
