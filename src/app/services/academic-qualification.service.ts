import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseUrl } from '../shared/baseUrl';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { AcademicQualification } from '../shared/academic-qualification';

@Injectable({
  providedIn: 'root',
})
export class AcademicQualificationService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getAcademicQualifications(): Observable<AcademicQualification[]> {
    return this.httpClient
      .get<AcademicQualification[]>(`${baseUrl}/cv/academicQualifications`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  addAcademicQualification(
    academicQualification: AcademicQualification
  ): Observable<any> {
    return this.httpClient
      .post(`${baseUrl}/cv/academicQualifications`, academicQualification)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updateAcademicQualification(
    id: string,
    academicQualification: AcademicQualification
  ): Observable<any> {
    return this.httpClient
      .put(`${baseUrl}/cv/academicQualifications/${id}`, academicQualification)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  deleteAcademicQualification(id: string): Observable<any> {
    return this.httpClient
      .delete(`${baseUrl}/cv/academicQualifications/${id}`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
