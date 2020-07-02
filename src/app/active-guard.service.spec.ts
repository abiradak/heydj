import { TestBed } from '@angular/core/testing';

import { ActiveGuardService } from './active-guard.service';

describe('ActiveGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActiveGuardService = TestBed.get(ActiveGuardService);
    expect(service).toBeTruthy();
  });
});
