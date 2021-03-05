import { Connection } from './../shared/connection';
import { baseUrl } from './../shared/baseUrl';
import { Observable } from 'rxjs';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getAllConnections(): Observable<Map<string, Map<string, Connection[]>>> {
    return this.httpClient
      .get<Map<string, Map<string, Connection[]>>>(`${baseUrl}/connections`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  accpetConnection(id: string): Observable<any> {
    return this.httpClient
      .patch(`${baseUrl}/connections/${id}/accept`, null)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  rejectConnection(id: string): Observable<any> {
    return this.httpClient
      .patch(`${baseUrl}/connections/${id}/reject`, null)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  requestConnection(username: string): Observable<any> {
    return this.httpClient
      .post(`${baseUrl}/connections`, username)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  cancelRequest(id: string): Observable<any> {
    return this.httpClient
      .patch(`${baseUrl}/connections/${id}/cancel`, null)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  removeConnection(id: string): Observable<any> {
    return this.httpClient
      .delete(`${baseUrl}/connections/${id}`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
