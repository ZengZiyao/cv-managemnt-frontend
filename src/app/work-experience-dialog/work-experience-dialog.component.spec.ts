import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkExperienceDialogComponent } from './work-experience-dialog.component';

describe('WorkExperienceDialogComponent', () => {
  let component: WorkExperienceDialogComponent;
  let fixture: ComponentFixture<WorkExperienceDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkExperienceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkExperienceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
