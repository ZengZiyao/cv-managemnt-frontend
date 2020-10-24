import { Biography } from './../shared/biography';
import { BiographyService } from './../services/biography.service';
import { BiographyDialogComponent } from './../biography-dialog/biography-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent implements OnInit {

  biography: Biography;

  constructor(private dialog: MatDialog, private biographyService: BiographyService) { }

  ngOnInit(): void {
    this.biographyService.getBiography().subscribe((data) => this.biography = data)
  }

  openDialog(biography: Biography) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = biography;
    
    dialogConfig.width = "40%";
    const dialogRef = this.dialog.open(BiographyDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }
      
    
  

}
