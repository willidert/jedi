import { IProject } from './projects/projects/model/IProject';
// import { API_PATH } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  readonly API_URL: string;

  constructor(private client: HttpClient) {
    this.API_URL = 'http://localhost:5000';
  }

  get_projects(): Observable<IProject[]> {
    return this.client.get<IProject[]>(`${this.API_URL}/projects`);
  }

  get_project_by_id(id: string): Observable<IProject> {
    return this.client.get<IProject>(`${this.API_URL}/projects/${id}`);
  }

  create_project(project: IProject): Observable<IProject> {
    return this.client.post<IProject>(`${this.API_URL}/projects`, project);
  }

  delete_project(id: number) {
    return this.client.delete(`${this.API_URL}/projects/${id}`).pipe(take(1));
  }

  update_project(project: IProject, id: number): Observable<IProject> {
    return this.client.patch<IProject>(
      `${this.API_URL}/projects/${id}`,
      project
    );
  }

  save(project: IProject): Observable<IProject> {
    if (project.id) {
      // update
      return this.update_project(project, project.id);
    }
    return this.create_project(project);
  }
}
