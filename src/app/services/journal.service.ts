import { Journal } from './../shared/journal';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../shared/baseUrl';
import { catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private httpClient: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  getJournals(): Observable<Journal[]> {
    return this.httpClient.get<Journal[]>(`${baseUrl}/journals`).pipe(catchError(this.processHttpMsgService.handleError));
  }

  addJournal(journal: Journal): Observable<any>  {
   return this.httpClient.post(`${baseUrl}/journals`, journal).pipe(catchError(this.processHttpMsgService.handleError));
  }
}
