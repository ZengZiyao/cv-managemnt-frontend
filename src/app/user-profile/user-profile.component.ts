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

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  pwdForm: FormGroup;
  userProfile: UserProfile;
  editing = false;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  @ViewChild('pform') ProfileDirective;
  @ViewChild('pwdform') PasswordDirective;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userProfile = new UserProfile();
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((data) => {
      this.userProfile = data;
    });
    this.createPasswordForm();
  }

  enableEdit() {
    this.editing = true;
    this.createProfileForm();
  }

  createProfileForm() {
    this.profileForm = this.fb.group({
      email: [this.userProfile.email, [Validators.required]],
      shortname: [this.userProfile.shortname, [Validators.required]],
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
}
