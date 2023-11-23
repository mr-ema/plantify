import { TestBed } from '@angular/core/testing';

import { PlantService } from './plant.service';

describe('PlantService', () => {
  let service: PlantService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [PlantService]});
    service = TestBed.inject(PlantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize database', () => {
    expectAsync(service.initializeDatabase()).toBeResolved();
  });

});
