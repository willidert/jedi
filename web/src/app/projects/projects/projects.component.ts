import { Observable } from 'rxjs';
import { ProjectService } from './../../project.service';
import { Component, OnInit } from '@angular/core';
import { IProject } from 'src/app/projects/projects/model/IProject';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<IProject[]>;
  displayedColumns = ['risk', 'name', 'begin_date', 'end_date', 'value'];

  constructor(private service: ProjectService) {
    this.projects$ = this.service.get_projects();
  }

  ngOnInit(): void {}
}
