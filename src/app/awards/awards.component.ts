import { AwardService } from './../services/award.service';
import { Award } from './../shared/award';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AwardDialogComponent } from '../award-dialog/award-dialog.component';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {

  awards: Award[];

  constructor(private dialog: MatDialog, private awardService: AwardService) { }

  ngOnInit(): void {
    this.awardService.getAwards().subscribe((data) => this.awards = data);
  }

  openDialog(award?: Award) {
    const dialogConfig = new MatDialogConfig();

 
      dialogConfig.data = award;
    

    dialogConfig.width = "40%";

    const dialogRef = this.dialog.open(AwardDialogComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      () => {
        this.ngOnInit()

      }
    )
  }

  deleteAward(award: Award) {
    this.awardService.deleteAward(award.id).subscribe(() => this.ngOnInit());
  }

}
