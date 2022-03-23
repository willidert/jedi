import { FormGroup, FormControl } from '@angular/forms';
import { IProject } from './../IProject';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css'],
})
export class CalcComponent implements OnInit {
  project_id!: string;

  project!: IProject;

  calcForm = new FormGroup({
    investment_value: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((value) => {
      this.project_id = value['id'];
      this.projectService
        .get_project_by_id(this.project_id)
        .subscribe((project) => (this.project = project));
    });
  }

  onSubmit() {
    if (this.calcForm.valid) {
      console.log(this.calcForm.value);
    }
  }
}
