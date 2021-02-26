import { Status } from './../shared/status';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Output } from '@angular/core';
import { NavbarJournalDialogComponent } from '../navbar-journal-dialog/navbar-journal-dialog.component';
import { NavbarConferenceDialogComponent } from '../navbar-conference-dialog/navbar-conference-dialog.component';
import { Router } from '@angular/router';
import { ComponentDialogComponent } from '../component-dialog/component-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<boolean>();
  @Input()
  status: Status;
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  openJournalDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '40%';
    dialogConfig.minWidth = 500;

    const dialogRef = this.dialog.open(
      NavbarJournalDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openConferenceDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '40%';
    dialogConfig.minWidth = 500;

    const dialogRef = this.dialog.open(
      NavbarConferenceDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  select() {
    this.messageEvent.emit(true);
  }

  redirectToAccount() {
    this.router.navigate(['account']);
  }

  openComponentDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '40%';
    dialogConfig.minWidth = 500;
    dialogConfig.data = this.status;

    const dialogRef = this.dialog.open(ComponentDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }
}
