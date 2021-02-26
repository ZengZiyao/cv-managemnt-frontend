import { Journal } from '../shared/journal';
import { Component, OnInit } from '@angular/core';
import { JournalService } from '../services/journal.service';
import { MatDialogRef } from '@angular/material/dialog';
import { I } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-navbar-journal-dialog',
  templateUrl: './navbar-journal-dialog.component.html',
  styleUrls: ['./navbar-journal-dialog.component.scss'],
})
export class NavbarJournalDialogComponent implements OnInit {
  journals: Journal[];
  invalid: boolean;
  constructor(
    private dialogRef: MatDialogRef<NavbarJournalDialogComponent>,
    private journalService: JournalService
  ) {}

  ngOnInit(): void {
    this.journalService.getJournals().subscribe((data) => {
      this.journals = data;
    });
  }

  addJournal() {
    this.journals.push(new Journal());
  }

  deleteJournal(index) {
    this.journals.splice(index);
  }

  save() {
    this.invalid = !this.journals.every((j) => {
      return j.name != undefined && j.name.length > 0;
    });

    if (this.invalid) {
      return;
    }

    let map: Map<string, number> = new Map();
    this.journals.forEach((j) => {
      if (map[j.name] == null) {
        map[j.name] = 1;
      } else {
        map[j.name]++;
      }
      if (map[j.name] > 1) {
        this.invalid = true;
      }
    });

    if (!this.invalid) {
      this.journalService.updateJounals(this.journals).subscribe(() => {
        this.dialogRef.close();
        location.reload();
      });
    }
  }
}
