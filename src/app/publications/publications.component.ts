import { PublicationService } from './../services/publication.service';
import { Publication } from './../shared/publication';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PublicationDialogComponent } from '../publication-dialog/publication-dialog.component';
import { Journal } from '../shared/journal';
import { JournalService } from '../services/journal.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {
  publications: Publication[];
  journals: Journal[];


  constructor(private dialog: MatDialog, private publicationService: PublicationService,
    private journalService: JournalService) { }

  ngOnInit(): void {
    this.publicationService.getAllPublications().subscribe((data) => this.publications = data);
    this.journalService.getJournals().subscribe((data) => {
      this.journals = data;
    });

  }

  openDialog(publication?: Publication) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      'publication': publication,
      'journals': this.journals
    };

    dialogConfig.width = "40%";

    const dialogRef = this.dialog.open(PublicationDialogComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    )
  }

  deletePub(publication: Publication) {
    this.publicationService.deletePublication(publication.id).subscribe(() => this.ngOnInit());
  }

}
