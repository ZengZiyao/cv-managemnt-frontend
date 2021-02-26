import { Award } from './../shared/award';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../shared/baseUrl';
import { catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root',
})
export class AwardService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getAwards(): Observable<Award[]> {
    return this.httpClient
      .get<Award[]>(`${baseUrl}/cv/awards`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  addAward(award: Award): Observable<any> {
    return this.httpClient
      .post(`${baseUrl}/cv/awards`, award)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updateAward(id: string, award: Award): Observable<any> {
    return this.httpClient
      .put(`${baseUrl}/cv/awards/${id}`, award)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  deleteAward(id: string): Observable<any> {
    return this.httpClient
      .delete(`${baseUrl}/cv/awards/${id}`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
