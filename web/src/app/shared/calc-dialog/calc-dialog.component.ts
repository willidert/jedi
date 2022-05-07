import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProject } from 'src/app/projects/projects/model/IProject';

@Component({
  selector: 'app-calc-dialog',
  templateUrl: './calc-dialog.component.html',
  styleUrls: ['./calc-dialog.component.css'],
})
export class CalcDialogComponent implements OnInit {
  value: number = 0;
  return_value: number = 0;

  constructor(
    public dialogRef: MatDialogRef<CalcDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProject
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCalc() {
    //investiment value n pode ser menor que o valor do projeto
    // adicionar um erro melhorzinho no else e arrumar os ifs
    if (this.data.value < this.value) {
      if (this.data.risk == 0) this.return_value = this.value * 0.05;
      else if (this.data.risk == 1) this.return_value = this.value * 0.1;
      else this.return_value = this.value * 0.2;
    } else {
      alert('é mole');
    }
  }
}
