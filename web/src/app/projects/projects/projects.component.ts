import { CalcDialogComponent } from './../../shared/calc-dialog/calc-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of, take, delay, tap } from 'rxjs';
import { IProject } from 'src/app/projects/projects/model/IProject';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { ProjectService } from './../services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<IProject[]>;
  project: IProject | undefined;
  displayedColumns = [
    'risk',
    'name',
    'begin_date',
    'end_date',
    'value',
    'actions',
  ];

  constructor(
    private service: ProjectService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projects$ = this.service.get_projects().pipe(
      catchError((error) => {
        this.onError('Loading projects failed!');
        return of([]);
      })
    );
  }

  ngOnInit(): void {}

  onAdd() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onDelete(id: number): void {
    this.service.delete_project(id).subscribe((success) => {
      this.projects$ = this.service.get_projects();
    });
  }

  onEdit(id: number): void {
    this.router.navigate([`edit/${id}`], { relativeTo: this.route });
  }

  openDialog(project_data: IProject): void {
    console.log(project_data);
    const dialogRef = this.dialog.open(CalcDialogComponent, {
      width: '250px',
      data: project_data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
