//Referencing:
//The Independent Institute of Education. 2023. APDS7311 Lab Guide.

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorComponent } from './error/error.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class ErrorinterceptorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        let errorMessage = "An Unknown Error has Occured.";
        if (error.error.message){
          errorMessage = error.error.message;
        }

        this.dialog.open(ErrorComponent, {data:{message:errorMessage}});
        return throwError(error);
      })
    );
  }
}
