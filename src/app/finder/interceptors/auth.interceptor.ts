import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
//import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
	constructor(
    //private authService: AuthService
  ){}

	intercept(req: HttpRequest<any>, next: HttpHandler):Observable<any>{
		const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'dc8c51581ac2421d2b5c2ce9af41a4630c8a4b3')
		})
		return next.handle(authRequest);
	}
}
