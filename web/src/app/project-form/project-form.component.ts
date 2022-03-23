import { ProjectService } from './../project.service';
import { IProject } from './../IProject';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit {
  project_id?: string;

  project?: IProject;

  projectForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
    begin_date: new FormControl('', [Validators.required]),
    end_date: new FormControl('', [Validators.required]),
    risk: new FormControl('', [Validators.required]),
    participants: new FormControl('', [Validators.required]),
  });

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.projectForm.valid) {
      let project = this.projectForm.value;
      let participants_array = project.participants.split(';');
      let participants = [];
      for (let index = 0; index < participants_array.length; index++) {
        participants.push({
          name: participants_array[index],
        });
      }
      project.participants = participants;
      this.projectService.save(project).subscribe(() => {
        this.router.navigate(['/', '/']);
      });
    }
  }

  cancel() {
    this.projectForm.reset();
    this.location.back();
  }

  get name() {
    return this.projectForm.get('name');
  }
  get value() {
    return this.projectForm.get('value');
  }
  get begin_date() {
    return this.projectForm.get('begin_date');
  }
  get end_date() {
    return this.projectForm.get('end_date');
  }
  get risk() {
    return this.projectForm.get('risk');
  }
  get participants() {
    return this.projectForm.get('participants');
  }
}
