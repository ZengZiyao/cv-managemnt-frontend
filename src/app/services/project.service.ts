import { catchError } from 'rxjs/operators';
import { Project } from './../shared/project';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { baseUrl } from '../shared/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${baseUrl}/projects`).pipe(catchError(this.processHttpMsgService.handleError));
  }

  addProject(project: Project): Observable<any> {
    return this.httpClient.post(`${baseUrl}/projects`, project).pipe(catchError(this.processHttpMsgService.handleError));
  }

  updateProject(id: string, project: Project): Observable<any> {
    return this.httpClient.put(`${baseUrl}/projects/${id}`, project).pipe(catchError(this.processHttpMsgService.handleError));
  }

  deleteProject(id: string): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/projects/${id}`).pipe(catchError(this.processHttpMsgService.handleError));
  }
}


