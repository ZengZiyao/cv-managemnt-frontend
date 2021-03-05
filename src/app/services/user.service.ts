import { UserProfile } from './../shared/user-profile';
import { baseUrl } from './../shared/baseUrl';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService,
    private router: Router
  ) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  login(credential: Credential) {
    this.httpClient
      .post(`${baseUrl}/user/login`, credential)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      )
      .subscribe((resp) => {
        localStorage.setItem('token', (resp as any).token);
        this.router.navigate(['cv']);
      });
  }

  signup(userProfile: UserProfile) {
    this.httpClient
      .post(`${baseUrl}/user/signup`, userProfile)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      )
      .subscribe((resp) => {
        localStorage.setItem('token', (resp as any).token);
        this.router.navigate(['cv']);
      });
  }

  logout() {
    this.httpClient
      .post(`${baseUrl}/user/logout`, null)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      )
      .subscribe(() => {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      });
  }

  getProfile(): Observable<UserProfile> {
    return this.httpClient
      .get<UserProfile>(`${baseUrl}/user/profile`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updateProfile(userProfile: UserProfile): Observable<any> {
    return this.httpClient
      .put(`${baseUrl}/user/profile`, userProfile)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updatePassword(password: string): Observable<any> {
    return this.httpClient
      .patch(`${baseUrl}/user/profile/password`, password)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
