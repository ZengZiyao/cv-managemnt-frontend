import { UserProfileComponent } from './../user-profile/user-profile.component';
import { SignupComponent } from './../signup/signup.component';
import { LoginComponent } from './../login/login.component';
import { Routes } from '@angular/router';
import { CvComponent } from '../cv/cv.component';

export const routes: Routes = [
  { path: 'cv', component: CvComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'account', component: UserProfileComponent },
  { path: '', redirectTo: '/cv', pathMatch: 'full' },
];
