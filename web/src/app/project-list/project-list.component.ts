import { Observable, delay, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IProject } from '../IProject';
import { ProjectService } from '../project.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  title = 'web';

  projects$!: Observable<IProject[]>;
  displayedColumns: String[] = [
    'id',
    'name',
    'end_date',
    'begin_date',
    'value',
    'participants',
  ];

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.get_all_projects();
  }

  get_all_projects(): void {
    this.projects$ = this.projectService.get_projects().pipe(delay(0), tap());
  }

  onDelete(id: number) {
    this.projectService.delete_project(id).subscribe((success) => {
      this.projects$ = this.projectService.get_projects();
    });
  }

  onEdit(id: number) {
    console.log(`projeto ${id} editado`);
  }

  onCalc(id: number) {
    this.router.navigate(['calc', id], { relativeTo: this.route });
  }
}
