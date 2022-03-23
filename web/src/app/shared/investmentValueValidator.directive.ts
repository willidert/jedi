import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function investimentValueValidator(project_value: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value < project_value
      ? { invalid_invest_value: { value: control.value } }
      : null;
  };
}
