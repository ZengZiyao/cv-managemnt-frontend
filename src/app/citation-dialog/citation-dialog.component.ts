import { CitationService } from './../services/citation.service';
import { Citation } from './../shared/citation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-citation-dialog',
  templateUrl: './citation-dialog.component.html',
  styleUrls: ['./citation-dialog.component.scss'],
})
export class CitationDialogComponent implements OnInit {
  citationForm: FormGroup;
  citationCopy: Citation;
  @ViewChild('cform') CitationDirective;
  constructor(
    private dialogRef: MatDialogRef<CitationDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data,
    private citationService: CitationService
  ) {
    this.citationCopy = data;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.citationForm = this.fb.group({
      database: [this.citationCopy.database],
      countWithoutSelf: [
        this.citationCopy.countWithoutSelf,
        [Validators.required],
      ],
      countWithSelf: [this.citationCopy.countWithSelf, [Validators.required]],
      hindex: [this.citationCopy.hindex, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.citationForm.valid) {
      let data = this.citationForm.value;
      this.citationService
        .updateCitation(this.citationCopy.id, data)
        .subscribe(() => this.dialogRef.close());
    }
  }

  close() {
    this.dialogRef.close();
  }
}
