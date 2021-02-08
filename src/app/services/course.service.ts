import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseUrl } from '../shared/baseUrl';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { Course } from "../shared/course";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${baseUrl}/courses`).pipe(catchError(this.processHttpMsgService.handleError));
  }

  addCourse(course: Course): Observable<any>  {
    return this.httpClient.post(`${baseUrl}/courses`, course).pipe(catchError(this.processHttpMsgService.handleError));
  }

  updateCourse(id: string, course: Course): Observable<any>  {
    return this.httpClient.put(`${baseUrl}/courses/${id}`, course).pipe(catchError(this.processHttpMsgService.handleError));
  }  

  deleteCourse(id: string): Observable<any>  {
    return this.httpClient.delete(`${baseUrl}/courses/${id}`).pipe(catchError(this.processHttpMsgService.handleError));
  }
}
