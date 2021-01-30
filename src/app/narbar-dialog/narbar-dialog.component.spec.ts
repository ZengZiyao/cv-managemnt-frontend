import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NarbarDialogComponent } from './narbar-dialog.component';

describe('NarbarDialogComponent', () => {
  let component: NarbarDialogComponent;
  let fixture: ComponentFixture<NarbarDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NarbarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarbarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
