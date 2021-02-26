import { baseUrl } from './../shared/baseUrl';
import { Status } from './../shared/status';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getStatus(): Observable<Status> {
    return this.httpClient
      .get<Status>(`${baseUrl}/cv/status`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updateStatus(id: string, status: Status): Observable<any> {
    return this.httpClient
      .put(`${baseUrl}/cv/status/${id}`, status)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
