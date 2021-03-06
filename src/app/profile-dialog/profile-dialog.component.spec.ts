import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileDialogComponent } from './profile-dialog.component';

describe('ProfileDialogComponent', () => {
  let component: ProfileDialogComponent;
  let fixture: ComponentFixture<ProfileDialogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProfileDialogComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
