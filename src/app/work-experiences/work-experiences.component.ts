import { Publication } from './../shared/publication';
import { WorkExperienceService } from './../services/work-experience.service';
import { WorkExperience } from './../shared/work-experience';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { PublicationDialogComponent } from '../publication-dialog/publication-dialog.component';
import { WorkExperienceDialogComponent } from '../work-experience-dialog/work-experience-dialog.component';
import { Cv } from '../shared/cv';

@Component({
  selector: 'app-work-experiences',
  templateUrl: './work-experiences.component.html',
  styleUrls: ['./work-experiences.component.scss'],
})
export class WorkExperiencesComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<boolean>();
  allSelected = false;
  selected: boolean[] = [];
  private _exportable: boolean;
  @Input()
  select: boolean;
  @Input()
  cv: Cv;
  @Input()
  hasWorkExperience: boolean;
  @Input('exportable')
  set exportable(exportable: boolean) {
    if (exportable && this.selected.indexOf(true) > -1) {
      this.cv.workExperiences = [];
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i]) {
          this.cv.workExperiences.push(this.workExperiences[i]);
        }
      }
      console.log(this.cv.workExperiences);
    }

    this._exportable = exportable;
    if (exportable) {
      this.emitMessage();
    } else {
      this.selected.fill(false);
      this.allSelected = false;
    }
  }
  get exportable(): boolean {
    return this._exportable;
  }

  workExperiences: WorkExperience[];

  constructor(
    private dialog: MatDialog,
    private workExperienceService: WorkExperienceService
  ) {}

  ngOnInit(): void {
    if (this.hasWorkExperience) {
      this.workExperienceService.getAllWorkExperience().subscribe((data) => {
        this.workExperiences = data;
        for (let i = 0; i < this.workExperiences.length; i++) {
          this.selected.push(false);
        }
      });
    }
  }

  openDialog(workExperience?: WorkExperience) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = workExperience;

    dialogConfig.width = '40%';
    dialogConfig.minWidth = 500;

    const dialogRef = this.dialog.open(
      WorkExperienceDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteWorkExperience(workExperience: WorkExperience) {
    this.workExperienceService
      .deleteWorkExperience(workExperience.id)
      .subscribe(() => this.ngOnInit());
  }

  emitMessage() {
    this.messageEvent.emit(true);
  }

  updateAllSelected(selected: boolean, i: number) {
    this.selected[i] = selected;
    this.allSelected = this.selected.every((i) => i);
  }

  someSelected(): boolean {
    return (
      this.selected.indexOf(true) > -1 && this.selected.indexOf(false) > -1
    );
  }

  setAll(selected: boolean) {
    this.allSelected = selected;
    this.selected.fill(selected);
  }
}
