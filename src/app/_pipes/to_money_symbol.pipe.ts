import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMoneySymbol'
})
export class ToMoneySymbolPipe implements PipeTransform {

  transform(value: any): any {
    return value + '€';
  }
}
