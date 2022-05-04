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

  selected_project!: IProject;
  id!: number;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  participants: IParticipant[] = [];

  constructor(
    private service: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

  ngOnInit(): void {
    this.route.params.subscribe((e) => (this.id = e['id']));
    if (this.id) {
      this.service.get_project_by_id(this.id).subscribe((e) => {
        // this.selected_project = e;
        this.projectForm.patchValue(e);
        this.participants = e.participants;
      });
    }
  }

  onSubmit() {
    console.log(this.projectForm.value);
    let project_model: IProject = this.projectForm.value;
    project_model.participants = this.participants;
    this.service
      .create_project(project_model)
      .subscribe((p) => this.router.navigate([''], { relativeTo: this.route }));
  }

  onCancel() {
    this.router.navigate([''], { relativeTo: this.route });
  }
}
