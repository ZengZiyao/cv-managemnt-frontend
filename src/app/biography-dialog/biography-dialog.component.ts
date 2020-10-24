import { Biography } from './../shared/biography';
import { BiographyService } from './../services/biography.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-biography-dialog',
  templateUrl: './biography-dialog.component.html',
  styleUrls: ['./biography-dialog.component.scss']
})
export class BiographyDialogComponent implements OnInit {

  biographyForm: FormGroup;
  biographyCopy: Biography;
  @ViewChild('bform') biographyFormDirective;

  constructor(    private dialogRef: MatDialogRef<BiographyDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data,
    private biographyService: BiographyService) { 
      this.biographyCopy = data == null ? new Biography : data;
    }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.biographyForm = this.fb.group({
      content: [this.biographyCopy.content, [Validators.required]]
    });
  }

  onSubmit() {
    this.biographyService.addBiography(this.biographyForm.value).subscribe(
      () => {
        this.dialogRef.close(this.biographyForm.value);
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

}
