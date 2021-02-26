import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseUrl } from '../shared/baseUrl';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { Membership } from '../shared/membership';

@Injectable({
  providedIn: 'root',
})
export class MembershipService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getAllMemberships(): Observable<Membership[]> {
    return this.httpClient
      .get<Membership[]>(`${baseUrl}/cv/memberships`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  addMembership(membership: Membership): Observable<any> {
    return this.httpClient
      .post(`${baseUrl}/cv/memberships`, membership)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updateMembership(id: string, membership: Membership): Observable<any> {
    return this.httpClient
      .put(`${baseUrl}/cv/memberships/${id}`, membership)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  deleteMembership(id: string): Observable<any> {
    return this.httpClient
      .delete(`${baseUrl}/cv/memberships/${id}`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
