import { NarbarDialogComponent } from './../narbar-dialog/narbar-dialog.component';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Output } from '@angular/core';

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

   openDialog() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.width = "40%";
    const dialogRef = this.dialog.open(NarbarDialogComponent, dialogConfig);

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
