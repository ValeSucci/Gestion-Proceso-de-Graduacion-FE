import { TestBed } from '@angular/core/testing';

import { EncriptadorService } from './encriptador.service';

describe('EncriptadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncriptadorService = TestBed.get(EncriptadorService);
    expect(service).toBeTruthy();
  });
});
