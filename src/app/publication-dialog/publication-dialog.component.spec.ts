import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PublicationDialogComponent } from './publication-dialog.component';

describe('PublicationDialogComponent', () => {
  let component: PublicationDialogComponent;
  let fixture: ComponentFixture<PublicationDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
