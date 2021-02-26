import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkExperience } from '../shared/work-experience';
import { baseUrl } from '../shared/baseUrl';
import { catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root',
})
export class WorkExperienceService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getAllWorkExperience(): Observable<WorkExperience[]> {
    return this.httpClient
      .get<WorkExperience[]>(`${baseUrl}/cv/work-experiences`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  addWorkExperience(workExperience: WorkExperience): Observable<any> {
    return this.httpClient
      .post(`${baseUrl}/cv/work-experiences`, workExperience)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updateWorkExperience(
    id: string,
    workExperience: WorkExperience
  ): Observable<any> {
    return this.httpClient
      .put(`${baseUrl}/cv/work-experiences/${id}`, workExperience)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  deleteWorkExperience(id: string): Observable<any> {
    return this.httpClient
      .delete(`${baseUrl}/cv/work-experiences/${id}`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
