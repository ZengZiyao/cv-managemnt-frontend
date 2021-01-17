import { AwardService } from './../services/award.service';
import { Award } from './../shared/award';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AwardDialogComponent } from '../award-dialog/award-dialog.component';
import { Cv } from '../shared/cv';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<boolean>();

  awards: Award[];
  allSelected: boolean = false;
  selected: boolean[] = [];
  private _exportable: boolean;
  @Input()
  select: boolean;
  @Input()
  cv: Cv;
  @Input("exportable")
  set exportable(exportable: boolean) {
    this._exportable = exportable;
    if (this.selected.indexOf(true) > -1) {
      this.cv.awards = [];
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i]) {
          this.cv.awards.push(this.awards[i]);
        }
      }
      console.log(this.cv.awards);

    }
    this.emitMessage();

  }
  get exportable(): boolean {
    return this._exportable;}

  constructor(private dialog: MatDialog, private awardService: AwardService) { }

  ngOnInit(): void {
    this.awardService.getAwards().subscribe((data) => {
      this.awards = data;
      for (let i = 0; i < this.awards.length; i++) {
        this.selected.push(false);
      }

    });
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
  
  emitMessage() {
    this.messageEvent.emit(true);
  }

  updateAllSelected(selected: boolean, i: number) {
    this.selected[i] = selected;
    this.allSelected = this.selected.every((i) => i);
  }

  someSelected():boolean {
    return this.selected.indexOf(true) > -1 && this.selected.indexOf(false) > -1;
  }

  setAll(selected: boolean) {
    this.allSelected = selected;
    this.selected.fill(selected) 
  }

}
