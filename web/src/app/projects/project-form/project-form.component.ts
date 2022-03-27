import { ProjectService } from './../services/projects.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    participants: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
  });

  constructor(private service: ProjectService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.projectForm.value);
  }
}
