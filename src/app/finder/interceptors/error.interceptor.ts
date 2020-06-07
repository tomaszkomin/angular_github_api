import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './../../finder/services/error.service';
export class ErrorInterceptor implements HttpInterceptor{

//constructor( public errorService:ErrorService){}
  constructor(){}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any>{
		return next.handle(req).pipe(
			catchError((errorRes : HttpErrorResponse) => {
				let errorMessage = "an unknown error ocurred!"
				if(errorRes.error.message){
          errorMessage = errorRes.error.message;
          console.log((`ERROR: ${errorRes.error.message}`));
          alert(errorRes.error.message);
				}
				return throwError(errorRes)
			})
		)
	}
}
