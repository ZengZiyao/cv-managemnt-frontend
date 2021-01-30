import { ProfileService } from './../services/profile.service';
import { Profile } from './../shared/profile';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {

  profileForm: FormGroup;
  profileCopy: Profile;
  @ViewChild('pform') profileFormDirective;


  constructor(
    private dialogRef: MatDialogRef<ProfileDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data,
    private profileService: ProfileService
    ) { 
      
      this.profileCopy = data == null ? new Profile() : data;
    }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.profileForm = this.fb.group(
      {
        name: [this.profileCopy.name, [Validators.required]],
        designation: [this.profileCopy.designation, [Validators.required]],
        school: [this.profileCopy.school, [Validators.required]]
      }
    );
  }

  onSubmit() {
    this.profileService.addProfile(this.profileForm.value).subscribe(
      () => {
        this.dialogRef.close();
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

}
