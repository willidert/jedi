import { tap, delay, Observable } from 'rxjs';
import { ProjectService } from './../../project.service';
import { Component, OnInit } from '@angular/core';
import { IProject } from 'src/app/projects/projects/model/IProject';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects$!: Observable<IProject[]>;
  displayedColumns = ['risk', 'name', 'begin_date', 'end_date', 'value'];

  constructor(private service: ProjectService) {}

  ngOnInit(): void {
    this.get_all_projects();
  }

  get_all_projects(): void {
    this.projects$ = this.service.get_projects().pipe(delay(0), tap());
  }
}
