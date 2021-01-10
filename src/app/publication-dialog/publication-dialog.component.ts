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
  date: FormControl;
  @ViewChild('pform') pulicationFormDirective;

  constructor(private dialogRef: MatDialogRef<PublicationDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data,
    private publicationService: PublicationService) { 
      this.publicationCopy = data.publication == null ? new Publication() : data.publication;
      this.journals = data.journals;
      this.tiers = TIERS;
      this.date = new FormControl(moment(this.publicationCopy.date));
    }

    ngOnInit(): void {
      this.createForm();
    }
  
    createForm() {
      this.publicationForm = this.fb.group({
        title: [this.publicationCopy.title, [Validators.required]],
        page: [this.publicationCopy.page, [Validators.required]],
        journal: [this.publicationCopy.journalName, [Validators.required]],
        tier: [this.publicationCopy.tier, [Validators.required]]
      });

    }
  
    onSubmit() {
      let data = this.publicationForm.value;
      data.authors = this.publicationCopy.authors;
      data.date = this.date.value;
      let journal = this.journals.find((e) => e.name === data.journal);
      data.journalId = journal.id
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


}
