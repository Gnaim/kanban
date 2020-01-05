import { TestBed } from '@angular/core/testing';

import { ConfirmMailService } from './confirm-mail.service';

describe('ConfirmMailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmMailService = TestBed.get(ConfirmMailService);
    expect(service).toBeTruthy();
  });
});
