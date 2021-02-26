import { ProcessHttpMsgService } from './process-http-msg.service';
import { Profile } from './../shared/profile';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../shared/baseUrl';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getProfile(): Observable<Profile> {
    return this.httpClient
      .get<Profile>(`${baseUrl}/cv/info`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  addProfile(profile: Profile): Observable<any> {
    return this.httpClient
      .post(`${baseUrl}/cv/info`, profile)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updateProfile(id: string, profile: Profile): Observable<any> {
    return this.httpClient
      .put(`${baseUrl}/cv/info/${id}`, profile)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  deleteProfile(id: string): Observable<any> {
    return this.httpClient
      .delete(`${baseUrl}/cv/info/${id}`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
