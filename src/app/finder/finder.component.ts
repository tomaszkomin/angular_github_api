import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { FinderModule } from './finder.module';
@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent implements OnInit {

  constructor() { }
  ngOnInit() {

  }
}
