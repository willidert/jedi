import { ProjectService } from './../project.service';
import { IProject } from './../IProject';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit {
  // private project: IProject;
  projectForm = new FormGroup({
    name: new FormControl(''),
    value: new FormControl(''),
    begin_date: new FormControl(''),
    end_date: new FormControl(''),
    risk: new FormControl(''),
    participants: new FormControl(''),
  });

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private location: Location
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
      this.projectService.create_project(project).subscribe((project) => {
        this.router.navigate(['/', '/']);
      });
    }
  }

  cancel() {
    this.projectForm.reset();
    this.location.back();
  }
}
