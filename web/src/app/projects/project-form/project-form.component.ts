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
    name: new FormControl(null, Validators.required),
    begin_date: new FormControl(null, Validators.required),
    end_date: new FormControl(null, Validators.required),
    risk: new FormControl(null, Validators.required),
    value: new FormControl(null, Validators.required),
  });

  risks: any = [
    { id: 0, name: 'Low' },
    { id: 1, name: 'Medium' },
    { id: 2, name: 'High' },
  ];

  selected_risk!: number;
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
        this.projectForm.patchValue(e);
        this.participants = e.participants;
        this.selected_risk = e.risk;
      });
    }
  }

  onSubmit() {
    let project_model: IProject = this.projectForm.value;
    project_model.participants = this.participants;
    this.service
      .create_project(project_model)
      .subscribe((p) => this.router.navigate([''], { relativeTo: this.route }));
  }

  onCancel() {
    this.projectForm.reset();
    this.router.navigate([''], { relativeTo: this.route });
  }
}
