import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinderModule } from './finder.module';
import { FinderComponent } from './finder.component';
import { SearchComponent } from './search/search.component';
import { CollectorComponent } from './collector/collector.component';
import { GithubService } from './services/api/github/github.service';
import { ErrorService } from './services/erorr/error.service';
import { ErrorComponent } from './error/error.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './collector/paginator/paginator.component';

describe('FinderComponent', () => {
  let component: FinderComponent;
  let fixture: ComponentFixture<FinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [FinderModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should render title', () =>{
  //   return true;
  // })
});
