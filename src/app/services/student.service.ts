import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseUrl } from '../shared/baseUrl';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { Student } from '../shared/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getStudents(): Observable<Student[]> {
    return this.httpClient
      .get<Student[]>(`${baseUrl}/cv/students`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  getMasterStudents(): Observable<Student[]> {
    return this.httpClient
      .get<Student[]>(`${baseUrl}/cv/students/masters`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  getPhdStudents(): Observable<Student[]> {
    return this.httpClient
      .get<Student[]>(`${baseUrl}/cv/students/phds`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  addStudent(student: Student): Observable<any> {
    return this.httpClient
      .post(`${baseUrl}/cv/students`, student)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updateStudent(id: string, student: Student): Observable<any> {
    return this.httpClient
      .put(`${baseUrl}/cv/students/${id}`, student)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  deleteStudent(id: string): Observable<any> {
    return this.httpClient
      .delete(`${baseUrl}/cv/students/${id}`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
