import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Project } from '../entity/Project';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  fail: boolean = true;
  PROJECT_ADD_URL = "http://127.0.0.1:3000/projects";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) { }

  createProject(title: string, priority: string, description: string, members: string[]): boolean {

    let response: Observable<any> = this.http.post<Project>(this.PROJECT_ADD_URL, new Project(title, priority, description, members), this.httpOptions);
    response.subscribe((response: Object) => {
      console.log(response);
      this.fail = false;

    }, (err) => { this.fail = true; });

    return !this.fail;
  }
}
