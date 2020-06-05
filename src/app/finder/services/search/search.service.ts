import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService implements OnDestroy{

  public username$ = new BehaviorSubject<string>('');
  private sub: Subscription;

  constructor() {}
  setUsername( username: string ) {
    if( username === '') return;
    this.username$.next(username);
  }
  getUsername$() : BehaviorSubject<string> {
    return this.username$;
  }
  ngOnDestroy(){
  }
}
