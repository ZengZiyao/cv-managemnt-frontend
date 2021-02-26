import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseUrl } from '../shared/baseUrl';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { Course } from '../shared/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getCourses(): Observable<Course[]> {
    return this.httpClient
      .get<Course[]>(`${baseUrl}/cv/courses`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  addCourse(course: Course): Observable<any> {
    return this.httpClient
      .post(`${baseUrl}/cv/courses`, course)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updateCourse(id: string, course: Course): Observable<any> {
    return this.httpClient
      .put(`${baseUrl}/cv/courses/${id}`, course)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  deleteCourse(id: string): Observable<any> {
    return this.httpClient
      .delete(`${baseUrl}/cv/courses/${id}`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
