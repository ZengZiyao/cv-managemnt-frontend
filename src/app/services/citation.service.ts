import { baseUrl } from './../shared/baseUrl';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { Citation } from '../shared/citation';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CitationService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getAllCitations(): Observable<Citation[]> {
    return this.httpClient
      .get<Citation[]>(`${baseUrl}/cv/citations`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updateCitation(id: string, citation: Citation): Observable<any> {
    return this.httpClient
      .put(`${baseUrl}/cv/citations/${id}`, citation)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
