import { ProjectService } from './../services/project.service';
import { Project } from './../shared/project';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { TIME_FORMATS_YEAR_ONLY } from '../shared/time-formats';

const moment = _rollupMoment || _moment;
const roles = ['PI', 'Co-PI', 'Colaborator', 'Others'];

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: TIME_FORMATS_YEAR_ONLY },
  ],
})
export class ProjectDialogComponent implements OnInit {
  roles: string[] = roles;
  projectForm: FormGroup;
  projectCopy: Project;
  currentWorking: boolean;
  external: boolean;
  dates: FormControl[] = [];
  otherRole: string = '';
  @ViewChild('pform') ProjectDirective;

  constructor(
    private dialogRef: MatDialogRef<ProjectDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data,
    private projectService: ProjectService
  ) {
    this.projectCopy = data == undefined ? new Project() : data;
    if (data == undefined) {
      this.projectCopy = new Project();
    } else {
      this.projectCopy = data;
      if (!roles.includes(this.projectCopy.role)) {
        this.otherRole = this.projectCopy.role;
        this.projectCopy.role = 'Others';
      }
    }
    this.dates.push(new FormControl(moment(this.projectCopy.startYear)));
    this.dates.push(new FormControl(moment(this.projectCopy.endYear)));
    this.currentWorking = this.projectCopy.endYear == undefined;
    this.external = this.projectCopy.external;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.projectForm = this.fb.group({
      title: [this.projectCopy.title, [Validators.required]],
      role: [this.projectCopy.role, [Validators.required]],
      funder: [this.projectCopy.funder, [Validators.required]],
      fundingAmount: [this.projectCopy.fundingAmount, [Validators.required]],
      otherRole: [this.otherRole, [this.otherRoleValidator()]],
    });
  }

  otherRoleValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden =
        this.projectForm != undefined &&
        this.projectForm.value.role === 'Others' &&
        control.value.length === 0;
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  onSubmit() {
    if (this.projectForm.valid) {
      let data: Project = this.projectForm.value;
      data.startYear = this.dates[0].value;
      data.external = this.external;
      if (!this.currentWorking) {
        data.endYear = this.dates[1].value;
      }

      if (data.role == 'Others') {
        data.role = this.otherRole;
      }

      if (this.projectCopy.id === undefined) {
        this.projectService
          .addProject(data)
          .subscribe(() => this.dialogRef.close());
      } else {
        this.projectService
          .updateProject(this.projectCopy.id, data)
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
