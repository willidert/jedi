import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { RiskPipe } from './pipes/risk.pipe';

@NgModule({
  declarations: [ErrorDialogComponent, RiskPipe],
  imports: [CommonModule, AppMaterialModule],
  exports: [ErrorDialogComponent, RiskPipe],
})
export class SharedModule {}
