import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../entity/Project';
import { HttpHelpers } from '../helpers/httpHelpers';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  getMyProjects() {
    return this.http.get(HttpHelpers.PROJECTS_URL, HttpHelpers.HTTP_OPTIONS);
  }
  getProjectById(id: string) {
    return this.http.get(HttpHelpers.PROJECTS_URL + "/" + id, HttpHelpers.HTTP_OPTIONS);
  }


  createProject(project: Project) {
    return this.http.post(HttpHelpers.PROJECTS_URL, project, { observe: "response" });
  }

  deleteProject(id: string) {
    return this.http.delete(HttpHelpers.PROJECTS_URL + "/" + id, { observe: "body" });
  }

  updateProject(project: Project) {
    return this.http.put(HttpHelpers.PROJECTS_URL + "/" + project._id, project, { observe: "response" });
  }

}
