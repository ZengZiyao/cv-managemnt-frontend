import { ProcessHttpMsgService } from './process-http-msg.service';
import { Profile } from './../shared/profile';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../shared/baseUrl';
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  getProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>(`${baseUrl}/info`).pipe(catchError(this.processHttpMsgService.handleError));
  }

  addProfile(profile: Profile): Observable<any>  {
    return this.httpClient.post(`${baseUrl}/info`, profile).pipe(catchError(this.processHttpMsgService.handleError));
  }

  updateProfile(profile: Profile): Observable<any> {
    return this.httpClient.put(`${baseUrl}/info`, profile).pipe(catchError(this.processHttpMsgService.handleError));
  }

  deleteProfile(): Observable<any>  {
    return this.httpClient.delete(`${baseUrl}/info`).pipe(catchError(this.processHttpMsgService.handleError));
  }

}
