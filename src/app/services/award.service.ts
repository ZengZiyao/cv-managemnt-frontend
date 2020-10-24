import { Award } from './../shared/award';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../shared/baseUrl';
import { catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class AwardService {

  constructor(private httpClient: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  getAwards(): Observable<Award[]> {
    return this.httpClient.get<Award[]>(`${baseUrl}/awards`).pipe(catchError(this.processHttpMsgService.handleError));
  }

  addAward(award: Award): Observable<any>  {
    return this.httpClient.post(`${baseUrl}/awards`, award).pipe(catchError(this.processHttpMsgService.handleError));
  }

  updateAward(id: string, award: Award): Observable<any>  {
    return this.httpClient.put(`${baseUrl}/awards/${id}`, award).pipe(catchError(this.processHttpMsgService.handleError));
  }  

  deleteAward(id: string): Observable<any>  {
    return this.httpClient.delete(`${baseUrl}/awards/${id}`).pipe(catchError(this.processHttpMsgService.handleError));
  }
}
