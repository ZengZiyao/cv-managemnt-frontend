import { Connection } from './../shared/connection';
import { ConnectionService } from './../services/connection.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { UserProfile } from './../shared/user-profile';
import { UserService } from './../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConnectionDialogComponent } from '../connection-dialog/connection-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  pwdForm: FormGroup;
  userProfile: UserProfile;
  acceptedFollowers: Connection[];
  allFollowers: Connection[];
  acceptedFollowings: Connection[];
  allFollowings: Connection[];
  editing = false;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  @ViewChild('pform') ProfileDirective;
  @ViewChild('pwdform') PasswordDirective;

  constructor(
    private userService: UserService,
    private connectionService: ConnectionService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.userProfile = new UserProfile();
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((data) => {
      this.userProfile = data;
    });
    this.createPasswordForm();
    this.connectionService.getAllConnections().subscribe((data) => {
      this.acceptedFollowers = data['follower']['accept'];
      this.acceptedFollowings = data['following']['accept'];
      this.allFollowers = data['follower']['all'];
      this.allFollowings = data['following']['all'];
    });
  }

  enableEdit() {
    this.editing = true;
    this.createProfileForm();
  }

  createProfileForm() {
    this.profileForm = this.fb.group({
      email: [this.userProfile.email, [Validators.required]],
      shortname: [this.userProfile.shortname, [Validators.required]],
      gsAuthorId: [this.userProfile.gsAuthorId]
      // oldPassword: ['', [this.passwordValidator()]],
      // password: [this.newPassword, [Validators.required]]
    });
  }

  createPasswordForm() {
    this.pwdForm = this.fb.group(
      {
        oldPassword: [
          this.oldPassword,
          [Validators.required, this.oldPasswordValidator()],
        ],
        newPassword: [this.newPassword, [Validators.required]],
        confirmPassword: [
          this.confirmPassword,
          [Validators.required, this.confirmPasswordValidator()],
        ],
      },
      {
        updateOn: 'submit',
      }
    );
  }

  oldPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden =
        this.userProfile != undefined &&
        this.userProfile.password != control.value;
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden =
        this.pwdForm != undefined &&
        this.pwdForm.value.newPassword != control.value;
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  saveProfile() {
    if (this.profileForm.valid) {
      let data = this.profileForm.value;
      data.id = this.userProfile.id;
      // data.password = this.newPassword;
      this.userService.updateProfile(data).subscribe(() => {
        this.editing = false;
        this.ngOnInit();
      });
    }
  }

  savePassword() {
    if (this.pwdForm.valid) {
      this.userService
        .updatePassword(this.pwdForm.value.newPassword)
        .subscribe(() => {
          this.router.navigateByUrl('/login');
        });
    }
  }

  cancelEdit() {
    this.editing = false;
  }

  logOut() {
    this.userService.logout();
  }

  removeConnection(connection: Connection) {
    this.connectionService.removeConnection(connection.id).subscribe((data) => {
      this.ngOnInit();
    });
  }

  cancelRequest(connection: Connection) {
    this.connectionService.cancelRequest(connection.id).subscribe((data) => {
      this.ngOnInit();
    });
  }

  acceptRequest(connection: Connection) {
    this.connectionService.accpetConnection(connection.id).subscribe((data) => {
      this.ngOnInit();
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '40%';
    dialogConfig.minWidth = 500;

    const dialogRef = this.dialog.open(ConnectionDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}
