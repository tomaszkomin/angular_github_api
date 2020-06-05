import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

export class ErrorInterceptor implements HttpInterceptor{
	constructor( ){}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any>{
		return next.handle(req).pipe(
			catchError((errorRes : HttpErrorResponse) => {
				let errorMessage = "an unknown error ocurred!"
				if(errorRes.error.message){
          errorMessage = errorRes.error.message;
          console.log(errorMessage);
          alert(`ERROR FROM INTERCEPTOR ${errorMessage}`);
				}
				return throwError(errorRes)
			})
		)
	}
}
