import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { SearchService } from './../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public isLoading = false;
  public username$:Subscription;

  constructor( private serchService:SearchService ) { }

  ngOnInit() {
    this.username$ = this.serchService.getUsername$()
      .subscribe( username => {
        this.isLoading = false;
        console.log(username);
      });
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
