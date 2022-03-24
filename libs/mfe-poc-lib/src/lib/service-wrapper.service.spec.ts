import { TestBed } from '@angular/core/testing';

import { ServiceWrapperService } from './service-wrapper.service';

describe('ServiceWrapperService', () => {
  let service: ServiceWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
