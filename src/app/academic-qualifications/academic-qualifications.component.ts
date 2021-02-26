import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AcademicQualification } from '../shared/academic-qualification';
import { Cv } from '../shared/cv';
import { AcademicQualificationService } from '../services/academic-qualification.service';
import { AcademicQualificationDialogComponent } from '../academic-qualification-dialog/academic-qualification-dialog.component';

@Component({
  selector: 'app-academic-qualifications',
  templateUrl: './academic-qualifications.component.html',
  styleUrls: ['./academic-qualifications.component.scss'],
})
export class AcademicQualificationsComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<boolean>();

  academicQualifications: AcademicQualification[];
  allSelected: boolean = false;
  selected: boolean[] = [];
  private _exportable: boolean;
  @Input()
  select: boolean;
  @Input()
  cv: Cv;
  @Input()
  hasAcademicQualification: boolean;
  @Input('exportable')
  set exportable(exportable: boolean) {
    this._exportable = exportable;
    if (exportable && this.selected.indexOf(true) > -1) {
      this.cv.academicQualifications = [];
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i]) {
          this.cv.academicQualifications.push(this.academicQualifications[i]);
        }
      }
    }

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

  constructor(
    private dialog: MatDialog,
    private academicQualificationService: AcademicQualificationService
  ) {}

  ngOnInit(): void {
    if (this.hasAcademicQualification) {
      this.academicQualificationService
        .getAcademicQualifications()
        .subscribe((data) => {
          this.academicQualifications = data;
          for (let i = 0; i < this.academicQualifications.length; i++) {
            this.selected.push(false);
          }
        });
    }
  }

  openDialog(academicQualification?: AcademicQualification) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = academicQualification;

    dialogConfig.width = '40%';
    dialogConfig.minWidth = 500;

    const dialogRef = this.dialog.open(
      AcademicQualificationDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteAcademicQualification(academicQualification: AcademicQualification) {
    this.academicQualificationService
      .deleteAcademicQualification(academicQualification.id)
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
