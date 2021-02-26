import { UserService } from './../services/user.service';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Credential } from '../shared/credential';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  credential: Credential;
  @ViewChild('lform') LoginDirective;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.credential = new Credential();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [this.credential.username, [Validators.required]],
      password: [this.credential.password, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value);
    }
  }
}
