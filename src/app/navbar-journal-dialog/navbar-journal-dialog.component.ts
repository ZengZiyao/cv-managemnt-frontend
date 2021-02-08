import { Journal } from '../shared/journal';
import { Component, OnInit } from '@angular/core';
import { JournalService } from '../services/journal.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar-journal-dialog',
  templateUrl: './navbar-journal-dialog.component.html',
  styleUrls: ['./navbar-journal-dialog.component.scss']
})
export class NavbarJournalDialogComponent implements OnInit {

  journals: Journal[];

  constructor(private dialogRef: MatDialogRef<NavbarJournalDialogComponent>, private journalService: JournalService) { }

  ngOnInit(): void {
    this.journalService.getJournals().subscribe((data) => this.journals = data);
  }

  addJournal() {
    this.journals.push(new Journal());
  }

  deleteJournal(index) {
    this.journals.splice(index);
  }

  save() {
    this.journalService.updateJounals(this.journals).subscribe(() => {
      this.dialogRef.close();
      location.reload()
    });
  }



}
