import { COUNTRIES_DB } from './../shared/countries_db';
import { Country } from '@angular-material-extensions/select-country';
import { Membership } from './../shared/membership';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment,  Moment } from 'moment';
import { TIME_FORMATS_YEAR_ONLY } from '../shared/time-formats';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MembershipService } from '../services/membership.service';
import { MatDatepicker } from '@angular/material/datepicker';
import * as countryStatePicker from "country-state-picker";

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-membership-dialog',
  templateUrl: './membership-dialog.component.html',
  styleUrls: ['./membership-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: TIME_FORMATS_YEAR_ONLY},
  ],

})
export class MembershipDialogComponent implements OnInit {
  membershipForm: FormGroup;
  membershipCopy: Membership;
  currentWorking: boolean;
  dates: FormControl[] = [];
  countries = COUNTRIES_DB;
  states: string[];
  @ViewChild("mform") membershipFormDirective;
  constructor(private dialogRef: MatDialogRef<MembershipDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data,
    private membershipService: MembershipService) {
      this.membershipCopy = data == null ? new Membership() : data;
      this.dates.push(new FormControl(moment(this.membershipCopy.startTime)));
      this.dates.push(new FormControl(moment(this.membershipCopy.endTime == null ? new Date() : new Date(this.membershipCopy.endTime))));
      this.currentWorking = this.membershipCopy.endTime == null;
      if (this.membershipCopy.country != null) {
        this.states = countryStatePicker.getStates(this.membershipCopy.country.alpha2Code.toLowerCase());
      }
     }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.membershipForm = this.fb.group({
      designation: [this.membershipCopy.designation, [Validators.required]],
      institution: [this.membershipCopy.institution, [Validators.required]],
      country: [this.membershipCopy.country, [Validators.required]],
      state: [this.membershipCopy.state, [Validators.required]]
    })
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    let data: Membership = this.membershipForm.value;
    data.startTime = this.dates[0].value;
    data.endTime = this.dates[1].value;
    if (this.membershipCopy.id === undefined) {
      this.membershipService.addMembership(data).subscribe(() => this.dialogRef.close());
    } else {
      this.membershipService.updateMembership(this.membershipCopy.id, data).subscribe(() => this.dialogRef.close());
    }
  }


  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>, index: number) {
    const ctrlValue = this.dates[index].value;
    ctrlValue.year(normalizedYear.year());
    this.dates[index].setValue(ctrlValue);
    datepicker.close();
  }

  onCountrySelected(country: Country) {
    this.states = countryStatePicker.getStates(country.alpha2Code.toLowerCase())
  }
}
