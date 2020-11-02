import { TIME_FORMATS } from './../shared/time-formats';
import { AwardService } from './../services/award.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Award } from '../shared/award';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment,  Moment } from 'moment';

const moment = _rollupMoment || _moment;


@Component({
  selector: 'app-award-dialog',
  templateUrl: './award-dialog.component.html',
  styleUrls: ['./award-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: TIME_FORMATS},
  ],
})
export class AwardDialogComponent implements OnInit {

  awardForm: FormGroup;
  awardCopy: Award;
  date: FormControl;
  @ViewChild('aform') awardFormDirective;

  constructor(private dialogRef: MatDialogRef<AwardDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data,
    private awardService: AwardService) {

      this.awardCopy = data == null ? new Award() : data;
      this.date = new FormControl(moment(this.awardCopy.date));

     }

     ngOnInit(): void {
      this.createForm();
    }
  
    createForm() {
      this.awardForm = this.fb.group({
        content: [this.awardCopy.content, [Validators.required]],
      });
    }
  
    onSubmit() {
      let data = this.awardForm.value;
      data.date = this.date.value;
      if (this.awardCopy.id === undefined) {
        this.awardService.addAward(data).subscribe(
          () => {
            this.dialogRef.close();
          }
        );
      } else {
        this.awardService.updateAward(this.awardCopy.id, data).subscribe(
          () => {
            this.dialogRef.close();
          }
        );
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

}
