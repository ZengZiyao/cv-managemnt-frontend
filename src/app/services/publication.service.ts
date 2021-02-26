import { Publication } from './../shared/publication';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../shared/baseUrl';
import { catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getAllPublications(): Observable<Publication[]> {
    return this.httpClient
      .get<Publication[]>(`${baseUrl}/cv/publications`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  addPublication(publication: Publication): Observable<any> {
    return this.httpClient
      .post(`${baseUrl}/cv/publications`, publication)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updatePublication(id: string, publication: Publication): Observable<any> {
    return this.httpClient
      .put(`${baseUrl}/cv/publications/${id}`, publication)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  deletePublication(id: string): Observable<any> {
    return this.httpClient
      .delete(`${baseUrl}/cv/publications/${id}`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
