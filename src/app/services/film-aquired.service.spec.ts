import { TestBed } from '@angular/core/testing';

import { FilmAquiredService } from './film-aquired.service';

describe('FilmAquiredService', () => {
  let service: FilmAquiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmAquiredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
