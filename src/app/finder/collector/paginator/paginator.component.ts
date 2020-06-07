import { Component, OnInit, Input } from '@angular/core';
import { CollectorComponent } from './../collector.component';
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() collectedRepo:{}[];
  @Input() repoLimit: Number;
  @Input() nextPage: boolean;
  constructor( public collectorComponent:CollectorComponent) { }

  ngOnInit() {

  }
}
