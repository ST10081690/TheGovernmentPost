//Referencing:
//The Independent Institute of Education. 2023. APDS7311 Lab Guide.

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
//import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authservice: AuthServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authservice.getToken();
    const authRequest = 
    request.clone({headers:request.headers.set('Authorization', 'Bearer ' + authToken)});

    return next.handle(authRequest);
  }
}
