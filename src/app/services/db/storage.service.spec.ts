import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage-angular';

describe('StorageService', () => {
  let storageService: StorageService;
  let storageProviderMock: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    const storageProviderSpy = jasmine.createSpyObj('Storage', ['create', 'set', 'get', 'remove']);

    TestBed.configureTestingModule({
      providers: [
        StorageService,
        { provide: Storage, useValue: storageProviderSpy }
      ]
    });

    storageService = TestBed.inject(StorageService);
    storageProviderMock = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;
  });

  it('should initialize storage', async () => {
    const storageInstance = {} as Storage;
    storageProviderMock.create.and.returnValue(Promise.resolve(storageInstance));

    await storageService.init();

    expect(storageProviderMock.create).toHaveBeenCalled();
    expect(storageService['_storage']).toBe(storageInstance);
  });
});
