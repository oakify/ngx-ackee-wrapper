import { TestBed } from '@angular/core/testing';

import { AckeeService } from './ackee.service';

describe('AckeeService', () => {
  let service: AckeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AckeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
