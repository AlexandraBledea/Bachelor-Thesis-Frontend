import { TestBed } from '@angular/core/testing';

import { SllValidationInterceptorService } from './sll-validation-interceptor.service';

describe('SllValidationInterceptorService', () => {
  let service: SllValidationInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SllValidationInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
