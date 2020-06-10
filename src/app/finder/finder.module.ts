import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FinderComponent } from './finder.component';
import { SearchComponent } from './search/search.component';
import { CollectorComponent } from './collector/collector.component';
import { PaginatorComponent } from './collector/paginator/paginator.component';
import { ErrorComponent } from './error/error.component';
import { ErrorService } from './services/erorr/error.service';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    FinderComponent,
    SearchComponent,
    CollectorComponent,
    PaginatorComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [
    FinderComponent
  ],
  providers:[
    ErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    ,{
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
  ,entryComponents: [ErrorComponent]
})
export class FinderModule { }
