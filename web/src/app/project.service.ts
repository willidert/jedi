import { IProject } from './IProject';
import { API_PATH } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private client: HttpClient) {}

  get_projects(): Observable<IProject[]> {
    return this.client.get<IProject[]>(`${API_PATH}/projects`);
  }

  get_project_by_id(id: number): Observable<IProject> {
    return this.client.get<IProject>(`${API_PATH}/projects/${id}`);
  }

  create_project(project: IProject): Observable<IProject> {
    return this.client.post<IProject>(`${API_PATH}/projects`, project);
  }

  delete_project(id: number) {
    return this.client.delete(`${API_PATH}/projects/${id}`).pipe(take(1));
  }

  update_project(project: IProject, id: number): Observable<IProject> {
    return this.client.patch<IProject>(`${API_PATH}/projects/${id}`, project);
  }
}
