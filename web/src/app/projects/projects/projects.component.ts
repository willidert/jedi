import { catchError, Observable, of } from 'rxjs';
import { ProjectService } from './../../project.service';
import { Component, OnInit } from '@angular/core';
import { IProject } from 'src/app/projects/projects/model/IProject';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<IProject[]>;
  displayedColumns = ['risk', 'name', 'begin_date', 'end_date', 'value'];

  constructor(private service: ProjectService, public dialog: MatDialog) {
    this.projects$ = this.service.get_projects().pipe(
      catchError((error) => {
        this.onError('Loading projects failed!');
        return of([]);
      })
    );
  }

  ngOnInit(): void {}

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
