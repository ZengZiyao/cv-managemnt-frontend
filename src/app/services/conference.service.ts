import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseUrl } from '../shared/baseUrl';
import { Conference } from '../shared/conference';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getConferences(): Observable<Conference[]> {
    return this.httpClient
      .get<Conference[]>(`${baseUrl}/cv/conferences`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  addConference(conference: Conference): Observable<any> {
    return this.httpClient
      .post(`${baseUrl}/cv/conferences`, conference)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updateConferences(conferences: Conference[]): Observable<any> {
    return this.httpClient
      .put(`${baseUrl}/cv/conferences`, conferences)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
