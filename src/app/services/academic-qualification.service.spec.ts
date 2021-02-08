import { TestBed } from '@angular/core/testing';

import { AcademicQualificationService } from './academic-qualification.service';

describe('AcademicQualificationService', () => {
  let service: AcademicQualificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicQualificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
