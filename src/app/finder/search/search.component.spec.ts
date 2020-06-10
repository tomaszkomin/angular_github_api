import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormsModule, NgForm } from '@angular/forms';
import { FinderModule } from './../finder.module';
import { SearchService } from './../services/search/search.service';
import { By } from '@angular/platform-browser';
describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('check for "tomasz" user message ', async () => {
    component = fixture.debugElement.componentInstance;
    await fixture.whenStable()
    component.ngForm.controls['username'].setValue('tomasz');
    expect(component.ngForm.valid).toBeTruthy();
  });
   it('check for "" user message ', async () =>  {
    component = fixture.debugElement.componentInstance;
    await fixture.whenStable();
    component.ngForm.controls['username'].setValue('');
    expect(component.ngForm.valid).toBeFalsy();
  });
});
