import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ErrorService {
  public error$ = new Subject<any>();
  setError(error: any){
    this.error$.next(error);
  }
  getErrorSub(){
    return this.error$;
  }
  constructor() { }
}
