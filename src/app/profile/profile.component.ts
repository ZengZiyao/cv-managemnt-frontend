import { Cv } from './../shared/cv';
import { ProfileService } from './../services/profile.service';
import { Profile } from './../shared/profile';
import { ProfileDialogComponent } from './../profile-dialog/profile-dialog.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<boolean>();

  profile: Profile;
  selected: boolean = false;
  private _exportable: boolean;
  @Input()
  select: boolean;
  @Input()
  cv: Cv;
  @Input()
  hasProfile: boolean;
  @Input('exportable')
  set exportable(exportable: boolean) {
    this._exportable = exportable;
    if (exportable) {
      this.emitMessage();
    } else {
      this.selected = false;
    }
    if (this.selected) {
      this.cv.profile = this.profile;
    }
  }
  get exportable(): boolean {
    return this._exportable;
  }

  constructor(
    private dialog: MatDialog,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    if (this.hasProfile) {
      this.profileService.getProfile().subscribe((profile) => {
        this.profile = profile;
      });
    }
  }

  openDialog(profile: Profile) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = profile;

    dialogConfig.width = '40%';
    dialogConfig.minWidth = 500;

    const dialogRef = this.dialog.open(ProfileDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  toggleSelection() {
    this.selected = !this.selected;
    if (!this.selected) {
      delete this.cv.profile;
    }
  }

  emitMessage() {
    this.messageEvent.emit(true);
  }
}
