import { WorkExperienceService } from './../services/work-experience.service';
import { WorkExperience } from './../shared/work-experience';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment,  Moment } from 'moment';
import { TIME_FORMATS } from '../shared/time-formats';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-work-experience-dialog',
  templateUrl: './work-experience-dialog.component.html',
  styleUrls: ['./work-experience-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: TIME_FORMATS},
  ],
})
export class WorkExperienceDialogComponent implements OnInit {

  workExperienceForm: FormGroup;
  workExperienceCopy: WorkExperience;
  currentWorking: boolean;
  dates: FormControl[] = [];

  @ViewChild('wform') WorkExperienceDirective;

  constructor(
    private dialogRef: MatDialogRef<WorkExperienceDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data,
    private workExperienceService: WorkExperienceService) { 
      this.workExperienceCopy = data == null ? new WorkExperience() : data;
      this.dates.push(new FormControl(moment(this.workExperienceCopy.startTime)));
      this.dates.push(new FormControl(moment(this.workExperienceCopy.endTime == null ? new Date() : new Date(this.workExperienceCopy.endTime))));
      this.currentWorking = this.workExperienceCopy.endTime == null;
    }

    ngOnInit(): void {
      this.createForm();
    }
  
    createForm() {
      this.workExperienceForm = this.fb.group({
        title: [this.workExperienceCopy.title, [Validators.required]],
        company: [this.workExperienceCopy.company, [Validators.required]],
      });

    }
  
    onSubmit() {
      let data: WorkExperience = this.workExperienceForm.value;
      data.startTime =this.dates[0].value;

      if (!this.currentWorking) {
        data.endTime = this.dates[1].value;
      }

      if (this.workExperienceCopy.id === undefined) {
        this.workExperienceService.addWorkExperience(data).subscribe(
          () => {
            this.dialogRef.close();
          }
        );
      } else {
        this.workExperienceService.updateWorkExperience(this.workExperienceCopy.id, data).subscribe(
          () => {
            this.dialogRef.close();
          }
        );
      }

    }
  
    close() {
      this.dialogRef.close();
    }

    chosenYearHandler(normalizedYear: Moment, index: number) {
      const ctrlValue = this.dates[index].value;
      ctrlValue.year(normalizedYear.year());
      this.dates[index].setValue(ctrlValue);
    }
  
    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, index: number) {
      const ctrlValue = this.dates[index].value;
      ctrlValue.month(normalizedMonth.month());
      this.dates[index].setValue(ctrlValue);
      datepicker.close();
    }


}
