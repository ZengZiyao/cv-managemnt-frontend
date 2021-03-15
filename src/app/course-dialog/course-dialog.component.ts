import { Course } from './../shared/course';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { TIME_FORMATS_YEAR_ONLY } from '../shared/time-formats';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from '../services/course.service';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: TIME_FORMATS_YEAR_ONLY },
  ],
})
export class CourseDialogComponent implements OnInit {
  types: string[] = ['LECTURE', 'TUTORIAL', 'LAB', 'OTHERS'];
  levels: string[] = ['UG', 'PG'];
  courseForm: FormGroup;
  courseCopy: Course;
  currentWorking: boolean;
  dates: FormControl[] = [];
  otherType: string = '';
  @ViewChild('cform') CourseDirective;

  constructor(
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data,
    private courseService: CourseService
  ) {
    if (data == null) {
      this.courseCopy = new Course();
    } else {
      this.courseCopy = data;
      if (!this.types.includes(this.courseCopy.courseType)) {
        this.otherType = this.courseCopy.courseType;
        this.courseCopy.courseType = 'OTHERS';
      }
    }
    this.dates.push(new FormControl(moment(this.courseCopy.startYear)));
    this.dates.push(new FormControl(moment(this.courseCopy.endYear)));
    this.currentWorking = this.courseCopy.endYear == undefined;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.courseForm = this.fb.group({
      title: [this.courseCopy.title, [Validators.required]],
      courseType: [this.courseCopy.courseType, [Validators.required]],
      courseCode: [this.courseCopy.courseCode, [Validators.required]],
      courseLevel: [this.courseCopy.courseLevel, [Validators.required]],
      semester: [this.courseCopy.semester, [Validators.required]],
      otherType: [this.otherType, [this.otherTypeValidator()]],
    });
  }

  otherTypeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden =
        this.courseForm != undefined &&
        this.courseForm.value.courseType === 'OTHERS' &&
        control.value.length === 0;

      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  onSubmit() {
    if (this.courseForm.valid) {
      let data = this.courseForm.value;
      data.startYear = this.dates[0].value;
      if (!this.currentWorking) {
        data.endYear = this.dates[1].value;
      } else {
        data.endYear = undefined;
      }

      if (data.courseType == 'OTHERS') {
        data.courseType = data.otherType;
      }

      if (this.courseCopy.id === undefined) {
        this.courseService
          .addCourse(data)
          .subscribe(() => this.dialogRef.close());
      } else {
        this.courseService
          .updateCourse(this.courseCopy.id, data)
          .subscribe(() => this.dialogRef.close());
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  chosenYearHandler(
    normalizedYear: Moment,
    datepicker: MatDatepicker<Moment>,
    index: number
  ) {
    const ctrlValue = this.dates[index].value;
    ctrlValue.year(normalizedYear.year());
    this.dates[index].setValue(ctrlValue);
    datepicker.close();
  }
}
