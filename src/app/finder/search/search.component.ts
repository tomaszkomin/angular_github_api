import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewContainerRef, Input, SimpleChanges } from '@angular/core';
import { Subscription, of, Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { SearchService } from './../services/search/search.service';
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public isLoading = false;
  public username$:Subscription;
  public searchChanged = new Subject<any>();

  @ViewChild( NgForm , {static:false}) ngForm: NgForm;
  constructor( private serchService:SearchService ) { }

  ngOnInit() {
    this.username$ = this.serchService.getUsername$()
      .subscribe( username => {
        this.isLoading = false;
      });

    this.debouncedSearchEvent().subscribe((result)=>{
      console.log(result);
    });
  }
  ngAfterViewInit(){
  }
  public handleSearchEvent($event:KeyboardEvent){
    this.searchChanged.next($event.target);
  }
  public debouncedSearchEvent(){
    const sub = this.searchChanged.pipe(
      debounceTime(1000),
      mergeMap((search:any) => {
        return search;
      })
    )
    return sub;
  }
  public onSignUp(sendObj: NgForm){
		if(sendObj.form.invalid) return;
    this.isLoading = true;
		this.serchService.setUsername(sendObj.form.value.username);
	}
	ngOnDestroy(): void{
		this.username$.unsubscribe();
		this.isLoading = false;
	}
}
