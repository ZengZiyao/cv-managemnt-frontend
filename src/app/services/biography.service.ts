import { Biography } from './../shared/biography';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../shared/baseUrl';
import { catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root',
})
export class BiographyService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getBiography(): Observable<Biography> {
    return this.httpClient
      .get<Biography>(`${baseUrl}/cv/biography`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  addBiography(biography: Biography): Observable<any> {
    return this.httpClient
      .post(`${baseUrl}/cv/biography`, biography)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updateBiography(id: string, biography: Biography): Observable<any> {
    return this.httpClient
      .put(`${baseUrl}/cv/biography/${id}`, biography)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  deleteBiogpraphy(id: string): Observable<any> {
    return this.httpClient
      .delete(`${baseUrl}/cv/biography/${id}`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
