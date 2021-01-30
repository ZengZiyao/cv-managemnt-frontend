import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseUrl } from '../shared/baseUrl';
import { Conference } from '../shared/conference';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {

  constructor(private httpClient: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  getConferences(): Observable<Conference[]> {
    return this.httpClient.get<Conference[]>(`${baseUrl}/conferences`).pipe(catchError(this.processHttpMsgService.handleError));
  }

  addConference(conference: Conference): Observable<any>  {
   return this.httpClient.post(`${baseUrl}/conferences`, conference).pipe(catchError(this.processHttpMsgService.handleError));
  }

  updateJounals(conferences: Conference[]): Observable<any> {
    return this.httpClient.put(`${baseUrl}/conferences`, conferences).pipe(catchError(this.processHttpMsgService.handleError));
  }}
