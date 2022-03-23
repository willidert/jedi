import { ProjectListComponent } from './project-list/project-list.component';
import { AppComponent } from './app.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'create-project', component: ProjectFormComponent },
  { path: '', component: ProjectListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
