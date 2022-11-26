import { TestBed } from '@angular/core/testing';

import { RecebimentoService } from './recebimento-service.service';

describe('RecebimentoServiceService', () => {
  let service: RecebimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecebimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
