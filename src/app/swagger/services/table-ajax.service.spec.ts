import { TestBed } from '@angular/core/testing';

import { TableAJAXService } from './table-ajax.service';

describe('TableAJAXService', () => {
  let service: TableAJAXService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableAJAXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
