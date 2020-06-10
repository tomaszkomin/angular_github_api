import { TestBed } from '@angular/core/testing';

import { GithubService } from './github.service';
import { FinderModule } from 'src/app/finder/finder.module';

describe('GithubService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [FinderModule]
  }));

  it('should be created', () => {
    const service: GithubService = TestBed.get(GithubService);
    expect(service).toBeTruthy();
  });
});
