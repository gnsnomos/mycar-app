import { TestBed, inject } from '@angular/core/testing';

import { ActivateLoginGuard } from './activate-login.guard';

describe('ActivateLoginGuradGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivateLoginGuard]
    });
  });

  it('should ...', inject([ActivateLoginGuard], (guard: ActivateLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
