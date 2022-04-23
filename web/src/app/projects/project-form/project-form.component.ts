import { ActivatedRoute, Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { IParticipant } from 'src/app/projects/projects/model/IParticipant';

import { IProject } from '../projects/model/IProject';
import { ProjectService } from './../services/projects.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit {
  projectForm = new FormGroup({
    name: new FormControl('', Validators.required),
    begin_date: new FormControl('', Validators.required),
    end_date: new FormControl('', Validators.required),
    risk: new FormControl('', Validators.required),
    // participants: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
  });

  constructor(
    private service: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  participants: IParticipant[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add participant
    if (value) {
      this.participants.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(participant: IParticipant): void {
    const index = this.participants.indexOf(participant);

    if (index >= 0) {
      this.participants.splice(index, 1);
    }
  }

  ngOnInit(): void {}

  onSubmit() {
    // tem q ter outra forma de fzr isso aqui
    let project = this.projectForm.value;
    let project_model: IProject = this.projectForm.value;
    project.participants = this.participants;
    project_model.begin_date = project.begin_date.toJSON();
    project_model.end_date = project.end_date.toJSON();
    console.log(project_model);
    this.service
      .create_project(project)
      .subscribe((p) => this.router.navigate([''], { relativeTo: this.route }));
  }

  onCancel() {
    console.log('cancelei');
    this.router.navigate([''], { relativeTo: this.route });
  }
}
