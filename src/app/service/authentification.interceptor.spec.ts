import { TestBed } from '@angular/core/testing';

import { AuthenticationInterceptor } from './authentication-interceptor.service';

describe('AuthentificationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthenticationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthenticationInterceptor = TestBed.inject(AuthenticationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
