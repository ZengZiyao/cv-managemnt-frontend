import { Biography } from './../shared/biography';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../shared/baseUrl';
import { catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class BiographyService {

  constructor(private httpClient: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  getBiography(): Observable<Biography> {
    return this.httpClient.get<Biography>(`${baseUrl}/biography`).pipe(catchError(this.processHttpMsgService.handleError));
  }

  addBiography(biography: Biography): Observable<any>  {
    return this.httpClient.post(`${baseUrl}/biography`, biography).pipe(catchError(this.processHttpMsgService.handleError));
  }

  updateBiography(biography: Biography): Observable<any>  {
    return this.httpClient.put(`${baseUrl}/biography`, biography).pipe(catchError(this.processHttpMsgService.handleError));
  }

  deleteBiogpraphy(): Observable<any>  {
    return this.httpClient.delete(`${baseUrl}/biography`).pipe(catchError(this.processHttpMsgService.handleError));
  }
}
