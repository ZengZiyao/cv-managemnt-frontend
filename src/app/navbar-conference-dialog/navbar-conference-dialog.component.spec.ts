import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarConferenceDialogComponent } from './navbar-conference-dialog.component';

describe('NavbarConferenceDialogComponent', () => {
  let component: NavbarConferenceDialogComponent;
  let fixture: ComponentFixture<NavbarConferenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarConferenceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarConferenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
