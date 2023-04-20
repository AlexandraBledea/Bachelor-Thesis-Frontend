import { TestBed } from '@angular/core/testing';

import { AuthguardRegisterService } from './authguard-register.service';

describe('AuthguardRegisterService', () => {
  let service: AuthguardRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthguardRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
