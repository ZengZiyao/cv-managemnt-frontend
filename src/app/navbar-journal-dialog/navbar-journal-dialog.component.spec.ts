import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarJournalDialogComponent } from './navbar-journal-dialog.component';

describe('NavbarJournalDialogComponent', () => {
  let component: NavbarJournalDialogComponent;
  let fixture: ComponentFixture<NavbarJournalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarJournalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarJournalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
