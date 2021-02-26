import { Biography } from './../shared/biography';
import { BiographyService } from './../services/biography.service';
import { BiographyDialogComponent } from './../biography-dialog/biography-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Cv } from '../shared/cv';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss'],
})
export class BiographyComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<boolean>();

  biography: Biography;
  selected: boolean = false;
  private _exportable: boolean;
  @Input()
  select: boolean;
  @Input()
  cv: Cv;
  @Input('exportable')
  set exportable(exportable: boolean) {
    if (exportable && this.selected) {
      this.cv.biography = this.biography;
    }
    this._exportable = exportable;
    if (exportable) {
      this.emitMessage();
    } else {
      this.selected = false;
    }
  }
  get exportable(): boolean {
    return this._exportable;
  }

  constructor(
    private dialog: MatDialog,
    private biographyService: BiographyService
  ) {}

  ngOnInit(): void {
    this.biographyService
      .getBiography()
      .subscribe((data) => (this.biography = data));
  }

  openDialog(biography: Biography) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = biography;

    dialogConfig.width = '40%';
    dialogConfig.minWidth = 500;

    const dialogRef = this.dialog.open(BiographyDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  toggleSelection() {
    this.selected = !this.selected;
    if (!this.selected) {
      delete this.cv.biography;
    }
  }

  emitMessage() {
    this.messageEvent.emit(true);
  }
}
