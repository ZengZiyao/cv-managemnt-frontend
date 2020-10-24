import { Publication } from './../shared/publication';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../shared/baseUrl';
import { catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private httpClient: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  getAllPublications(): Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(`${baseUrl}/publications`).pipe(catchError(this.processHttpMsgService.handleError));
  }

  addPublication(publication: Publication): Observable<any>  {
    return this.httpClient.post(`${baseUrl}/publications`, publication).pipe(catchError(this.processHttpMsgService.handleError));
  }

  updatePublication(id: string, publication: Publication): Observable<any>  {
    return this.httpClient.put(`${baseUrl}/publications/${id}`, publication).pipe(catchError(this.processHttpMsgService.handleError));
  }

  deletePublication(id: string): Observable<any>  {
    return this.httpClient.delete(`${baseUrl}/publications/${id}`).pipe(catchError(this.processHttpMsgService.handleError));
  }
}
