import { UserService } from './../services/user.service';
import { UserProfile } from './../shared/user-profile';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  userProfile: UserProfile;
  confirmPassword: string;
  @ViewChild('sform') SignupDirective;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userProfile = new UserProfile();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      username: [this.userProfile.username, [Validators.required]],
      password: [this.userProfile.password, [Validators.required]],
      email: [this.userProfile.email, [Validators.required]],
      confirmPassword: [this.confirmPassword, [this.passwordValidator()]],
    });
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden =
        this.signupForm != undefined &&
        this.signupForm.value.password != control.value;
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.userService.signup(this.signupForm.value);
    }
  }
}
