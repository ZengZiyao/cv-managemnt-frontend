import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseUrl } from '../shared/baseUrl';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { AcademicQualification } from "../shared/academic-qualification";

@Injectable({
  providedIn: 'root'
})
export class AcademicQualificationService {

  constructor(private httpClient: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  getAcademicQualifications(): Observable<AcademicQualification[]> {
    return this.httpClient.get<AcademicQualification[]>(`${baseUrl}/academicQualifications`).pipe(catchError(this.processHttpMsgService.handleError));
  }

  addAcademicQualification(academicQualification: AcademicQualification): Observable<any>  {
    return this.httpClient.post(`${baseUrl}/academicQualifications`, academicQualification).pipe(catchError(this.processHttpMsgService.handleError));
  }

  updateAcademicQualification(id: string, academicQualification: AcademicQualification): Observable<any>  {
    return this.httpClient.put(`${baseUrl}/academicQualifications/${id}`, academicQualification).pipe(catchError(this.processHttpMsgService.handleError));
  }  

  deleteAcademicQualification(id: string): Observable<any>  {
    return this.httpClient.delete(`${baseUrl}/academicQualifications/${id}`).pipe(catchError(this.processHttpMsgService.handleError));
  }
}
