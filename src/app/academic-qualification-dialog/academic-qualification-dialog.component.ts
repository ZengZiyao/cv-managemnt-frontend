import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _moment from 'moment';
import { default as _rollupMoment,  Moment } from 'moment';
import { AcademicQualificationService } from '../services/academic-qualification.service';
import { AcademicQualification } from '../shared/academic-qualification';
import { TIME_FORMATS_YEAR_ONLY } from '../shared/time-formats';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-academic-qualification-dialog',
  templateUrl: './academic-qualification-dialog.component.html',
  styleUrls: ['./academic-qualification-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: TIME_FORMATS_YEAR_ONLY},
  ],

})
export class AcademicQualificationDialogComponent implements OnInit {

  academicQualificationForm: FormGroup;
  academicQualificationCopy: AcademicQualification;
  date: FormControl;
  @ViewChild('aform') academicQualificationFormDirective;

  constructor(private dialogRef: MatDialogRef<AcademicQualificationDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data,
    private academicQualificationService: AcademicQualificationService) {

      this.academicQualificationCopy = data == null ? new AcademicQualification() : data;
      this.date = new FormControl(moment(this.academicQualificationCopy.year));

     }

     ngOnInit(): void {
      this.createForm();
    }
  
    createForm() {
      this.academicQualificationForm = this.fb.group({
        university: [this.academicQualificationCopy.university, [Validators.required]],
        degree: [this.academicQualificationCopy.degree, [Validators.required]],
        major: [this.academicQualificationCopy.major, [Validators.required]]
      });
    }
  
    onSubmit() {
      let data = this.academicQualificationForm.value;
      data.year = this.date.value;
      if (this.academicQualificationCopy.id === undefined) {
        this.academicQualificationService.addAcademicQualification(data).subscribe(
          () => {
            this.dialogRef.close();
          }
        );
      } else {
        this.academicQualificationService.updateAcademicQualification(this.academicQualificationCopy.id, data).subscribe(
          () => {
            this.dialogRef.close();
          }
        );
      }

    }
  
    close() {
      this.dialogRef.close();
    }


    chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
      const ctrlValue = this.date.value;
      ctrlValue.year(normalizedYear.year());
      this.date.setValue(ctrlValue);
      datepicker.close();
    }

}
