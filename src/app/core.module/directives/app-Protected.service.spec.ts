/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppProtectedService } from './app-Protected.service';

describe('Service: AppProtected', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppProtectedService]
    });
  });

  it('should ...', inject([AppProtectedService], (service: AppProtectedService) => {
    expect(service).toBeTruthy();
  }));
});