import { ConferenceService } from './../services/conference.service';
import { Author } from './../shared/author';
import { TIERS } from '../shared/tiers';
import { JournalService } from './../services/journal.service';
import { Journal } from './../shared/journal';
import { Publication } from './../shared/publication';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PublicationService } from '../services/publication.service';

import * as _moment from 'moment';
import { default as _rollupMoment,  Moment } from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { TIME_FORMATS } from '../shared/time-formats';
import { MatDatepicker } from '@angular/material/datepicker';
import { PubType } from '../shared/pubType';
import { Conference } from "../shared/conference";

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-publication-dialog',
  templateUrl: './publication-dialog.component.html',
  styleUrls: ['./publication-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: TIME_FORMATS},
  ],
})
export class PublicationDialogComponent implements OnInit {

  publicationForm: FormGroup;
  publicationCopy: Publication;
  tiers: string[];
  journals: Journal[];
  conferences: Conference[];
  date: FormControl;
  type: PubType;
  // text: string;
  @ViewChild('pform') pulicationFormDirective;

  constructor(private dialogRef: MatDialogRef<PublicationDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data,
    private publicationService: PublicationService,
    private journalService: JournalService,
    private conferenceService: ConferenceService) { 
      this.publicationCopy = data.publication == null ? new Publication() : data.publication;
      this.tiers = TIERS;
      this.date = new FormControl(moment(this.publicationCopy.date));
      this.type = this.publicationCopy.type;
    }

    ngOnInit(): void {
      this.createForm();
      this.journalService.getJournals().subscribe((data) => {
        this.journals = data;
      });
      this.conferenceService.getConferences().subscribe((data) => this.conferences = data);
    }
  
    createForm() {
      this.publicationForm = this.fb.group({
        title: [this.publicationCopy.title, [Validators.required]],
        page: [this.publicationCopy.page, [Validators.required]],
        type: [this.publicationCopy.type, [Validators.required]],
        name: [this.publicationCopy.pubSource.name, [Validators.required]],
        tier: [this.publicationCopy.tier],
        // country : []
        // text: [this.text]
      });

    }
  
    onSubmit() {
      let data = this.publicationForm.value;
      data.authors = this.publicationCopy.authors;
      data.date = this.date.value;
      data.type = this.type;
      if (data.type == PubType.JOURNAL) {
        data.pubSource = this.journals.find((e) => e.name === data.name);
        data.country = null;
      } else if (data.type == PubType.CONFERENCE) {
        data.PubSource = this.conferences.find((e) => e.name == data.name);
        data.tier = null;
      }
      if (this.publicationCopy.id == null) {
        this.publicationService.addPublication(data).subscribe(() => this.dialogRef.close());
      } else {
        this.publicationService.updatePublication(this.publicationCopy.id, data).subscribe(() => this.dialogRef.close());
      }


    }
  
    close() {
      this.dialogRef.close();
    }

    chosenYearHandler(normalizedYear: Moment) {
      const ctrlValue = this.date.value;
      ctrlValue.year(normalizedYear.year());
      this.date.setValue(ctrlValue);
    }
  
    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
      const ctrlValue = this.date.value;
      ctrlValue.month(normalizedMonth.month());
      this.date.setValue(ctrlValue);
      datepicker.close();
    }

    updateAuthors(authors: Author[]) {
      this.publicationCopy.authors = authors;
    }

    // parsePublication(text: string): Publication {
    //   let p = new Publication();
    //   if (text.startsWith("##")) {
    //     p.tier = "1A";
    //     text = text.slice(2);
    //   } else if (text.startsWith("#")) {
    //     p.tier = "1";
    //     text = text.slice(1);
    //   } else {
    //     p.tier = "2";
    //   }

    //   let authors = text.slice(0, text.indexOf("\"")).trim();
    //   authors.split(",").forEach((a) => {
    //     a = a.trim();
    //     let author = new Author();
    //     if (a.endsWith("**")) {
    //       author.fellow = true;
    //       author.name = a.slice(0, -2)
    //     } else if (a.endsWith("*")) {
    //       author.student = true;
    //       author.name = a.slice(0, -1);
    //     } else {
    //       author.name = a;
    //     }
    //     p.authors.push(author);
    //   });
    //   text = text.slice(text.indexOf("\"") + 1);
    //   p.title = text.slice(0, text.indexOf("\""));
    //   text = text.slice(text.indexOf("\"") + 2);
      
    //   return p;
    // }


}
