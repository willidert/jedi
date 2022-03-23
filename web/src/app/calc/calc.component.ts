import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProject } from './../IProject';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProjectService } from '../project.service';
import { investimentValueValidator } from '../shared/investmentValueValidator.directive';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css'],
})
export class CalcComponent implements OnInit {
  project_id!: string;

  project!: IProject;

  returnInvestValue: string = '';

  calcForm = new FormGroup({
    investment_value: new FormControl('', [
      Validators.required,
      // investimentValueValidator(this.project.value),
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.project_id = param['id'];
      this.projectService
        .get_project_by_id(this.project_id)
        .subscribe((project) => (this.project = project));
    });
  }

  onSubmit() {
    if (this.calcForm.valid) {
      var res;
      let investiment = this.calcForm.value.investment_value;
      if (this.project.risk == 0) {
        res = 0.05 * investiment;
      } else if (this.project.risk == 1) {
        res = 0.1 * investiment;
      } else {
        res = 0.2 * investiment;
      }
      this.returnInvestValue = res.toString();
    }
  }

  get investment_value() {
    return this.calcForm.get('investment_value');
  }

  back() {
    this.calcForm.reset();
    this.location.back();
  }
}
