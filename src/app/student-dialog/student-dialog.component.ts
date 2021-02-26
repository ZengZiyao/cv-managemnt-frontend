import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { TIME_FORMATS_YEAR_ONLY } from '../shared/time-formats';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { StudentService } from '../services/student.service';
import { Student } from '../shared/student';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: TIME_FORMATS_YEAR_ONLY },
  ],
})
export class StudentDialogComponent implements OnInit {
  roles: string[] = ['Main Supervisor', 'Sole Supervisor', 'Co-supervisor'];
  studentForm: FormGroup;
  studentCopy: Student;
  currentWorking: boolean;
  dates: FormControl[] = [];

  @ViewChild('sform') StudentDirective;

  constructor(
    private dialogRef: MatDialogRef<StudentDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data,
    private studentService: StudentService
  ) {
    this.studentCopy = data;

    this.dates.push(new FormControl(moment(this.studentCopy.startYear)));
    this.dates.push(new FormControl(moment(this.studentCopy.endYear)));
    this.currentWorking = this.studentCopy.endYear == null;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.studentForm = this.fb.group({
      name: [this.studentCopy.name, [Validators.required]],
      role: [this.studentCopy.role, [Validators.required]],
      title: [this.studentCopy.title, [Validators.required]],
      status: [this.studentCopy.status, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      let data: Student = this.studentForm.value;
      data.startYear = this.dates[0].value;
      if (!this.currentWorking) {
        data.endYear = this.dates[1].value;
      }

      if (this.studentCopy.id === undefined) {
        this.studentService
          .addStudent(data)
          .subscribe(() => this.dialogRef.close());
      } else {
        this.studentService
          .updateStudent(this.studentCopy.id, data)
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
