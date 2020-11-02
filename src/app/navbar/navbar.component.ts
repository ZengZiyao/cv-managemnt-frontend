import { NarbarDialogComponent } from './../narbar-dialog/narbar-dialog.component';
import { JournalService } from './../services/journal.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BiographyDialogComponent } from '../biography-dialog/biography-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

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

}
