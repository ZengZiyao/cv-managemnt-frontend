import { FormControl, FormGroup } from '@angular/forms';
import { PublicationService } from './../services/publication.service';
import { Publication } from './../shared/publication';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PublicationDialogComponent } from '../publication-dialog/publication-dialog.component';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { TIME_FORMATS } from '../shared/time-formats';
import { Cv } from '../shared/cv';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: TIME_FORMATS },
  ],
})
export class PublicationsComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<boolean>();
  allSelected: boolean = false;
  selected: boolean[] = [];
  private _exportable: boolean;
  private _hasPublication: boolean;
  @Input()
  select: boolean;
  @Input()
  cv: Cv;
  @Input('hasPublication')
  set hasPublication(hasPublication: boolean) {
    this._hasPublication = hasPublication;
    if (hasPublication) {
      this.ngOnInit();
    }
  }
  get hasPublication(): boolean {
    return this._hasPublication;
  }
  @Input('exportable')
  set exportable(exportable: boolean) {
    this._exportable = exportable;
    if (exportable && this.selected.indexOf(true) > -1) {
      this.cv.publications = [];
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i]) {
          this.cv.publications.push(this.publications[i]);
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

  publications: Publication[];
  publicationsCopy: Publication[];
  // journals: Journal[];
  sortOrder = -1;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private dialog: MatDialog,
    private publicationService: PublicationService
  ) {}

  ngOnInit(): void {
    if (this.hasPublication) {
      this.publicationService.getAllPublications().subscribe((data) => {
        this.publications = data;
        this.publicationsCopy = data;
        for (let i = 0; i < this.publications.length; i++) {
          this.selected.push(false);
        }
      });
    }
  }

  openDialog(publication?: Publication) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = publication;

    dialogConfig.width = '40%';
    dialogConfig.minWidth = 500;

    const dialogRef = this.dialog.open(
      PublicationDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  deletePub(publication: Publication) {
    this.publicationService
      .deletePublication(publication.id)
      .subscribe(() => this.ngOnInit());
  }

  onOptionsSelected(sortOrder: number) {
    switch (sortOrder) {
      case 0:
        this.publications = this.publications.sort((a, b) =>
          a.date < b.date ? -1 : 1
        );
        break;
      case 1:
        this.publications = this.publications.sort((a, b) =>
          a.pubSource.name < b.pubSource.name ? -1 : 1
        );
        break;
      case 2:
        this.publications = this.publications.sort((a, b) =>
          a.tier < b.tier ? -1 : 1
        );
        break;
      default:
        this.publications = this.publications.sort((a, b) =>
          a.id < b.id ? -1 : 1
        );
    }
  }

  setRange() {
    let start = new Date(this.range.value.start);
    let end = new Date(this.range.value.end);
    this.publications = this.publications.filter((e) => {
      let date = new Date(e.date);
      return date >= start && date <= end;
    });
  }

  resetRange() {
    this.publications = this.publicationsCopy;
    this.range.reset();
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
