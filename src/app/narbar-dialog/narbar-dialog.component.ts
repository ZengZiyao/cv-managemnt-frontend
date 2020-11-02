import { Journal } from './../shared/journal';
import { Component, OnInit } from '@angular/core';
import { JournalService } from '../services/journal.service';
import { MatDialogRef } from '@angular/material/dialog';
import { BiographyDialogComponent } from '../biography-dialog/biography-dialog.component';

@Component({
  selector: 'app-narbar-dialog',
  templateUrl: './narbar-dialog.component.html',
  styleUrls: ['./narbar-dialog.component.scss']
})
export class NarbarDialogComponent implements OnInit {

  journals: Journal[];

  constructor(private dialogRef: MatDialogRef<BiographyDialogComponent>, private journalService: JournalService) { }

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
    });
  }



}
