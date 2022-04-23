import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { RiskPipe } from './pipes/risk.pipe';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_DATE } from './util/MY_DATE';
import { CalcDialogComponent } from './calc-dialog/calc-dialog.component';

@NgModule({
  declarations: [ErrorDialogComponent, RiskPipe, CalcDialogComponent],
  imports: [CommonModule, AppMaterialModule],
  // providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE }],
  exports: [ErrorDialogComponent, RiskPipe],
})
export class SharedModule {}
