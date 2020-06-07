import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  public error: Subject<any>;
  constructor( public errorService: ErrorService) { }

  ngOnInit() {
    this.error = this.errorService.getErrorSub();
  }
}
