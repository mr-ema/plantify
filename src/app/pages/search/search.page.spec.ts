import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Plant } from '@models/api';
import { SearchPage } from './search.page';
import { PlantService } from '@services/api/plant.service';
import { of } from 'rxjs';

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;
  let plantService: jasmine.SpyObj<PlantService>;
  const mockPlants: Plant[] = [
    { id: 1, name: "fake", description: "fake", img_url: "" },
    { id: 2, name: "fake 2", description: "fake", img_url: "" }
  ]

  beforeEach(() => {
    const plantServiceSpy = jasmine.createSpyObj('PlantService', ['searchPlant']);

    TestBed.configureTestingModule({
      imports: [SearchPage],
      providers: [{ provide: PlantService, useValue: plantServiceSpy }]
    });

    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    plantService = TestBed.inject(PlantService) as jasmine.SpyObj<PlantService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle search input and process data', fakeAsync(() => {
    const query = 'testQuery';

    plantService.searchPlant.and.returnValue(Promise.resolve(of(mockPlants)));

    component.handleSearchInput({ target: { value: query } });
    tick();

    expect(plantService.searchPlant).toHaveBeenCalledWith(query.toLowerCase());
    expect(component.searchData$).toBeDefined();
  }));

  it('should clear search results', () => {
    component.handleSearchInput({ target: { value: '' } });

    expect(component.searchData$).toBeUndefined();
  });
});
