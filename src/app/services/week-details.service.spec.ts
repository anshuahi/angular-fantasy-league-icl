import { TestBed } from '@angular/core/testing';

import { WeekDetailsService } from './week-details.service';

describe('WeekDetailsService', () => {
  let service: WeekDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeekDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
