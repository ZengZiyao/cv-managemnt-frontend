import { ConferenceService } from './../services/conference.service';
import { Component, OnInit } from '@angular/core';
import { Conference } from '../shared/conference';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar-conference-dialog',
  templateUrl: './navbar-conference-dialog.component.html',
  styleUrls: ['./navbar-conference-dialog.component.scss'],
})
export class NavbarConferenceDialogComponent implements OnInit {
  conferences: Conference[];
  invalid: boolean;

  constructor(
    private dialogRef: MatDialogRef<NavbarConferenceDialogComponent>,
    private conferenceService: ConferenceService
  ) {}

  ngOnInit(): void {
    this.conferenceService
      .getConferences()
      .subscribe((data) => (this.conferences = data));
  }

  addConference() {
    this.conferences.push(new Conference());
  }

  deleteConference(index) {
    this.conferences.splice(index);
  }

  save() {
    this.invalid = !this.conferences.every((c) => {
      return c.name != undefined && c.name.length > 0;
    });

    if (this.invalid) {
      return;
    }

    let map: Map<string, number> = new Map();
    this.conferences.forEach((c) => {
      if (map[c.name] == null) {
        map[c.name] = 1;
      } else {
        map[c.name]++;
      }
      if (map[c.name] > 1) {
        this.invalid = true;
      }
    });

    if (!this.invalid) {
      this.conferenceService
        .updateConferences(this.conferences)
        .subscribe(() => {
          this.dialogRef.close();
          location.reload();
        });
    }
  }
}
