import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'risk',
})
export class RiskPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'thumb_up';
      case 2:
        return 'card_membership';
      case 3:
        return 'label_important';
      default:
        return 'code';
    }
  }
}
