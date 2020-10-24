import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkExperience } from '../shared/work-experience';
import { baseUrl } from '../shared/baseUrl';
import { catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {

  constructor(private httpClient: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  getAllWorkExperience(): Observable<WorkExperience[]> {
    return this.httpClient.get<WorkExperience[]>(`${baseUrl}/work-experiences`).pipe(catchError(this.processHttpMsgService.handleError));
  }

  addWorkExperience(workExperience: WorkExperience): Observable<any>  {
    return this.httpClient.post(`${baseUrl}/work-experiences`, workExperience).pipe(catchError(this.processHttpMsgService.handleError));
  }

  updateWorkExperience(id: string, workExperience: WorkExperience): Observable<any>  {
    return this.httpClient.put(`${baseUrl}/work-experiences/${id}`, workExperience).pipe(catchError(this.processHttpMsgService.handleError));
  }

  deleteWorkExperience(id: string): Observable<any>  {
    return this.httpClient.delete(`${baseUrl}/work-experiences/${id}`).pipe(catchError(this.processHttpMsgService.handleError));
  }
}
