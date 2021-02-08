import { ConferenceService } from './../services/conference.service';
import { Component, OnInit } from '@angular/core';
import { Conference } from '../shared/conference';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar-conference-dialog',
  templateUrl: './navbar-conference-dialog.component.html',
  styleUrls: ['./navbar-conference-dialog.component.scss']
})
export class NavbarConferenceDialogComponent implements OnInit {

  conferences: Conference[];

  constructor(private dialogRef: MatDialogRef<NavbarConferenceDialogComponent>, private conferenceService: ConferenceService) { }

  ngOnInit(): void {
    this.conferenceService.getConferences().subscribe((data) => this.conferences = data);
  }

  addConference() {
    this.conferences.push(new Conference());
  }

  deleteConference(index) {
    this.conferences.splice(index);
  }

  save() {
    this.conferenceService.updateConferences(this.conferences).subscribe(() => {
      this.dialogRef.close();
      location.reload()
    });
  }

}
