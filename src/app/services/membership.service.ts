import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseUrl } from '../shared/baseUrl';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { Membership } from "../shared/membership";

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private httpClient: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  getAllMemberships(): Observable<Membership[]> {
    return this.httpClient.get<Membership[]>(`${baseUrl}/memberships`).pipe(catchError(this.processHttpMsgService.handleError));
  }

  addMembership(membership: Membership): Observable<any> {
    return this.httpClient.post(`${baseUrl}/memberships`, membership).pipe(catchError(this.processHttpMsgService.handleError));
  }

  updateMembership(id: string, membership: Membership): Observable<any> {
    return this.httpClient.put(`${baseUrl}/memberships/${id}`, membership).pipe(catchError(this.processHttpMsgService.handleError));
  }

  deleteMembership(id: string): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/memberships/${id}`).pipe(catchError(this.processHttpMsgService.handleError));
  }
}
