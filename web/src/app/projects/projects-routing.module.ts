import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'create', component: ProjectFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
