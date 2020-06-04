import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinderComponent } from './finder.component';
import { SearchComponent } from './search/search.component';
import { CollectorComponent } from './collector/collector.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    FinderComponent,
    SearchComponent,
    CollectorComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    FinderComponent
  ]
})
export class FinderModule { }
