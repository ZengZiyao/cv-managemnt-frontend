import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicQualificationDialogComponent } from './academic-qualification-dialog.component';

describe('AcademicQualificationDialogComponent', () => {
  let component: AcademicQualificationDialogComponent;
  let fixture: ComponentFixture<AcademicQualificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicQualificationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicQualificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
