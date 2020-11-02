import { FormControl, FormGroup } from '@angular/forms';
import { PublicationService } from './../services/publication.service';
import { Publication } from './../shared/publication';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PublicationDialogComponent } from '../publication-dialog/publication-dialog.component';
import { Journal } from '../shared/journal';
import { JournalService } from '../services/journal.service';
import * as _moment from 'moment';
import { default as _rollupMoment,  Moment } from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { TIME_FORMATS } from '../shared/time-formats';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: TIME_FORMATS},
  ],
})
export class PublicationsComponent implements OnInit {
  publications: Publication[];
  publicationsCopy: Publication[];
  journals: Journal[];
  sortOrder = -1;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private dialog: MatDialog, private publicationService: PublicationService,
    private journalService: JournalService) { 
    }

  ngOnInit(): void {
    this.publicationService.getAllPublications().subscribe((data) => {this.publications = data; this.publicationsCopy = data});
    this.journalService.getJournals().subscribe((data) => {
      this.journals = data;
    });

  }

  openDialog(publication?: Publication) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      'publication': publication,
      'journals': this.journals
    };

    dialogConfig.width = "40%";

    const dialogRef = this.dialog.open(PublicationDialogComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    )
  }

  deletePub(publication: Publication) {
    this.publicationService.deletePublication(publication.id).subscribe(() => this.ngOnInit());
  }

  onOptionsSelected(sortOrder: number) {
    switch(sortOrder) {
      case 0:
        this.publications = this.publications.sort((a, b) => a.date < b.date ? -1 : 1);
        break;
      case 1:
        this.publications = this.publications.sort((a, b) => a.journal.name < b.journal.name ? -1 : 1);
        break;
      case 2:
        this.publications = this.publications.sort((a, b) => a.tier < b.tier ? -1 : 1);
        break;
      default:
        this.publications = this.publications.sort((a, b) => a.id < b.id ? -1 : 1);
    }
  }

  setRange() {
    let start = new Date(this.range.value.start);
    let end = new Date(this.range.value.end);
    this.publications = this.publications.filter((e) => {
      let date = new Date(e.date);
      return date >= start && date <= end;
    } )
  }

  resetRange() {
    this.publications = this.publicationsCopy;
    this.range.reset();
  }

}
