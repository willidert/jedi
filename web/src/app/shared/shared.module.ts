import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { RiskPipe } from './pipes/risk.pipe';
import { CalcDialogComponent } from './calc-dialog/calc-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ErrorDialogComponent, RiskPipe, CalcDialogComponent],
  imports: [CommonModule, AppMaterialModule, FormsModule],
  exports: [ErrorDialogComponent, RiskPipe],
})
export class SharedModule {}
