import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, take, tap } from 'rxjs';
import { API_PATH } from 'src/environments/environment';

import { IProject } from '../projects/model/IProject';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  readonly API_URL: string;

  constructor(private client: HttpClient) {
    this.API_URL = API_PATH;
  }

  get_projects(): Observable<IProject[]> {
    return this.client.get<IProject[]>(`${this.API_URL}/projects`).pipe(
      first(),
      tap((projects) => console.log(projects))
    );
  }

  get_project_by_id(id: number): Observable<IProject> {
    return this.client
      .get<IProject>(`${this.API_URL}/projects/${id}`)
      .pipe(tap((_) => console.log(`${id} coletado`)));
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
