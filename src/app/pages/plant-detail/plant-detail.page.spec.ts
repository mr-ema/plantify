import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlantDetailPage } from './plant-detail.page';
import { PlantService } from '@services/api/plant.service';
import { Plant } from '@models/api';

describe('PlantDetailPage', () => {
  let component: PlantDetailPage;
  let fixture: ComponentFixture<PlantDetailPage>;
  let plantService: PlantService;
  let activatedRoute: ActivatedRoute;
  const mockPlant: Plant = { id: 1, name: "fake", description: "fake", img_url: "" };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [PlantDetailPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          }
        },
        {
          provide: PlantService,
          useValue: {
            getPlantById: () => of(mockPlant),
            getBookmarkedPlant: () => of({ is_bookmarked: true }),
            togglePlantBookmark: () => of({ is_bookmarked: false })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlantDetailPage);
    component = fixture.componentInstance;
    plantService = TestBed.inject(PlantService);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize plant details and bookmark status', async () => {
    spyOn(plantService, 'getPlantById').and.callThrough();
    spyOn(plantService, 'getBookmarkedPlant').and.callThrough();

    await component.ngOnInit();

    expect(plantService.getPlantById).toHaveBeenCalledWith('1');
    expect(plantService.getBookmarkedPlant).toHaveBeenCalledWith('1');
    expect(component.plant).toBeDefined();
    expect(component.isBookmarked).toBeTrue();
  });

  it('should toggle bookmark status', async () => {
    spyOn(component, 'toggleBookmark').and.callThrough();
    spyOn(plantService, 'togglePlantBookmark').and.callThrough();

    await component.toggleBookmark({} as Plant);

    expect(plantService.togglePlantBookmark).toHaveBeenCalled();
    expect(component.toggleBookmark).toHaveBeenCalled();
    expect(component.isBookmarked).toBeFalse();
  });
});
