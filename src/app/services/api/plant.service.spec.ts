import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PlantService } from './plant.service';
import { Plant } from '@models/api';

describe('PlantService', () => {
  let service: PlantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlantService]
    });
    service = TestBed.inject(PlantService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a specific plant by ID', async () => {
    const mockPlant: Plant = { id: 1, name: 'Test Plant', description: 'fake description', img_url: 'fake url' };
    const plantId = '1';

    (await service.getPlantById(plantId)).subscribe((plant: Plant) => {
      expect(plant).toEqual(mockPlant);
    });

    const request = httpMock.expectOne(`${service['_apiUrl']}/plants/${plantId}`);
    expect(request.request.method).toBe('GET');
    request.flush(mockPlant);
  });

});
