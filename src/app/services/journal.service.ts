import { Journal } from './../shared/journal';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../shared/baseUrl';
import { catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getJournals(): Observable<Journal[]> {
    return this.httpClient
      .get<Journal[]>(`${baseUrl}/cv/journals`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  addJournal(journal: Journal): Observable<any> {
    return this.httpClient
      .post(`${baseUrl}/cv/journals`, journal)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updateJounals(journals: Journal[]): Observable<any> {
    return this.httpClient
      .put(`${baseUrl}/cv/journals`, journals)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
