import { catchError } from 'rxjs/operators';
import { Project } from './../shared/project';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { baseUrl } from '../shared/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(
    private httpClient: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService
  ) {}

  getAllProjects(): Observable<Project[]> {
    return this.httpClient
      .get<Project[]>(`${baseUrl}/cv/projects`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  addProject(project: Project): Observable<any> {
    return this.httpClient
      .post(`${baseUrl}/cv/projects`, project)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  updateProject(id: string, project: Project): Observable<any> {
    return this.httpClient
      .put(`${baseUrl}/cv/projects/${id}`, project)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }

  deleteProject(id: string): Observable<any> {
    return this.httpClient
      .delete(`${baseUrl}/cv/projects/${id}`)
      .pipe(
        catchError((error) => this.processHttpMsgService.handleError(error))
      );
  }
}
