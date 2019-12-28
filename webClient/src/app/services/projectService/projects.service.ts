import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Project } from '../../entity/Project';
import { Observable } from 'rxjs';
import { HttpHelpers } from '../helpers/httpHelpers';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {


  constructor(private http: HttpClient) { }

  getMyProjects() {
    return this.http.get(HttpHelpers.PROJECTS_URL, HttpHelpers.HTTP_OPTIONS);
  }

  createProject(project: Project) {
    return this.http.post(HttpHelpers.PROJECTS_URL, project, HttpHelpers.HTTP_OPTIONS);
  }
}
