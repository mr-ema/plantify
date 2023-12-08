import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';

import { HomePage } from './home.page';
import { PlantService } from '@services/api/plant.service';
import { Plant } from '@models/api';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let plantService: PlantService;
  const mockPlants: Plant[] = [
    {id: 1, name: "fake", description: "fake", img_url: ""},
    {id: 2, name: "fake 2", description: "fake", img_url: ""}
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        { provide: PlantService, useValue: { getAllPlants: () => of(mockPlants) } }
      ]
    });

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    plantService = TestBed.inject(PlantService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch plants on initialization', async () => {
    spyOn(plantService, 'getAllPlants').and.callThrough();

    await component.ngOnInit();

    expect(plantService.getAllPlants).toHaveBeenCalled();
    expect(component.loading).toBe(false);
    expect(component.plants).toEqual(mockPlants);
  });
});
