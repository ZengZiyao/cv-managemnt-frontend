import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Output } from '@angular/core';
import { NavbarJournalDialogComponent } from '../navbar-journal-dialog/navbar-journal-dialog.component';
import { NavbarConferenceDialogComponent } from '../navbar-conference-dialog/navbar-conference-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

   openJournalDialog() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.width = "40%";
    const dialogRef = this.dialog.open(NavbarJournalDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  openConferenceDialog() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.width = "40%";
    const dialogRef = this.dialog.open(NavbarConferenceDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  select() {
    this.messageEvent.emit(true);
  }

}
