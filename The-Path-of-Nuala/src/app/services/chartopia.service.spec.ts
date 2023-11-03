import { TestBed } from '@angular/core/testing';

import { ChartopiaService } from './chartopia.service';

describe('ChartopiaService', () => {
  let service: ChartopiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartopiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
