import { TestBed } from '@angular/core/testing';

import { ApiGenerateService } from './api-generate.service';

describe('ApiGenerateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiGenerateService = TestBed.get(ApiGenerateService);
    expect(service).toBeTruthy();
  });
});
