import { CitationService } from '../services/citation.service';
import { Citation } from '../shared/citation';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Cv } from '../shared/cv';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CitationDialogComponent } from '../citation-dialog/citation-dialog.component';

@Component({
  selector: 'app-citations',
  templateUrl: './citations.component.html',
  styleUrls: ['./citations.component.scss'],
})
export class CitationsComponent implements OnInit {
  displayedColumns: string[] = [
    'database',
    'countWithoutSelf',
    'countWithSelf',
    'hIndex',
    'edit',
  ];
  @Output()
  messageEvent = new EventEmitter<boolean>();
  citations: Citation[];
  selected: boolean;
  private _exportable: boolean;
  private _hasCitation: boolean;
  @Input()
  cv: Cv;
  @Input('hasCitation')
  set hasCitation(hasCitation: boolean) {
    this._hasCitation = hasCitation;
    if (hasCitation) {
      this.citationService.getAllCitations().subscribe((data) => {
        this.citations = data;
      });
    }
  }
  get hasCitation(): boolean {
    return this._hasCitation;
  }
  @Input('select')
  select: boolean;

  @Input('exportable')
  set exportable(exportable: boolean) {
    this._exportable = exportable;
    if (exportable && this.selected) {
      this.cv.citations = this.citations;
    }
    if (exportable) {
      this.emitMessage();
    } else {
      this.selected = false;
    }
  }
  get exportable(): boolean {
    return this._exportable;
  }

  constructor(
    private dialog: MatDialog,
    private citationService: CitationService
  ) {}

  ngOnInit(): void {
    if (this.hasCitation) {
      this.citationService.getAllCitations().subscribe((data) => {
        this.citations = data;
      });
    }
  }

  openDialog(citation: Citation) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = citation;

    dialogConfig.width = '40%';
    dialogConfig.minWidth = 500;

    const dialogRef = this.dialog.open(CitationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  emitMessage() {
    this.messageEvent.emit(true);
  }

  toggle(selected: boolean) {
    this.selected = selected;
  }
}
