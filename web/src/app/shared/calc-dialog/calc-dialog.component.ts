import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProject } from 'src/app/projects/projects/model/IProject';

@Component({
  selector: 'app-calc-dialog',
  templateUrl: './calc-dialog.component.html',
  styleUrls: ['./calc-dialog.component.css'],
})
export class CalcDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CalcDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProject
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
