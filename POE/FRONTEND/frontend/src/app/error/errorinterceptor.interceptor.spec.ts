import { TestBed } from '@angular/core/testing';

import { ErrorinterceptorInterceptor } from './error.interceptor';

describe('ErrorinterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorinterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorinterceptorInterceptor = TestBed.inject(ErrorinterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
