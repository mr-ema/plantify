import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BookmarkPage } from './bookmark.page';
import { PlantService } from '@services/api/plant.service';
import { Bookmark } from '@models/api';

describe('BookmarkPage', () => {
  let component: BookmarkPage;
  let fixture: ComponentFixture<BookmarkPage>;
  let plantService: jasmine.SpyObj<PlantService>;
  const mockBookmarks: Bookmark[] = [
    { id: 1, is_bookmarked: true, name: "bookmark 1", entity_id: '1', entity_type: "plant" },
    { id: 2, is_bookmarked: true, name: "bookmark 1", entity_id: '2', entity_type: "plant" }
  ];

  beforeEach(() => {
    const plantServiceSpy = jasmine.createSpyObj('PlantService', ['getAllBookmarkedPlants']);

    TestBed.configureTestingModule({
      imports: [BookmarkPage, RouterTestingModule],
      providers: [{ provide: PlantService, useValue: plantServiceSpy }]
    });

    fixture = TestBed.createComponent(BookmarkPage);
    component = fixture.componentInstance;
    plantService = TestBed.inject(PlantService) as jasmine.SpyObj<PlantService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load bookmarks on init', fakeAsync(() => {
    plantService.getAllBookmarkedPlants.and.returnValue(Promise.resolve(of(mockBookmarks)));

    fixture.detectChanges();
    tick();

    expect(plantService.getAllBookmarkedPlants).toHaveBeenCalled();
    expect(component.plantBookmarks).toEqual(mockBookmarks);
    expect(component.loading).toBe(false);
  }));

  it('should navigate to plant detail when plantClicked is called', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');
    const mockPlantBookmark = mockBookmarks[0];

    component.plantClicked(mockPlantBookmark);

    expect(routerSpy).toHaveBeenCalledWith(['plant-detail', mockPlantBookmark.entity_id]);
  });
});
