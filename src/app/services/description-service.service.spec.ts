import { TestBed } from '@angular/core/testing';

import { DescriptionServiceService } from './description-service.service';

describe('DescriptionServiceService', () => {
  let service: DescriptionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescriptionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
