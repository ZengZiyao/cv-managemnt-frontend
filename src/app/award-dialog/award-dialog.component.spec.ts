import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AwardDialogComponent } from './award-dialog.component';

describe('AwardDialogComponent', () => {
  let component: AwardDialogComponent;
  let fixture: ComponentFixture<AwardDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
