import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseUrl } from '../shared/baseUrl';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { Student } from "../shared/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${baseUrl}/students`).pipe(catchError(this.processHttpMsgService.handleError));
  }

  getMasterStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${baseUrl}/students/masters`).pipe(catchError(this.processHttpMsgService.handleError));
  }

  getPhdStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${baseUrl}/students/phds`).pipe(catchError(this.processHttpMsgService.handleError));
  }


  addStudent(student: Student): Observable<any>  {
    return this.httpClient.post(`${baseUrl}/students`, student).pipe(catchError(this.processHttpMsgService.handleError));
  }

  updateStudent(id: string, student: Student): Observable<any>  {
    return this.httpClient.put(`${baseUrl}/students/${id}`, student).pipe(catchError(this.processHttpMsgService.handleError));
  }  

  deleteStudent(id: string): Observable<any>  {
    return this.httpClient.delete(`${baseUrl}/students/${id}`).pipe(catchError(this.processHttpMsgService.handleError));
  }
}
