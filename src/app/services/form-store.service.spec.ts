/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormStoreService } from './form-store.service';

describe('Service: FormStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormStoreService]
    });
  });

  it('should ...', inject([FormStoreService], (service: FormStoreService) => {
    expect(service).toBeTruthy();
  }));
});
