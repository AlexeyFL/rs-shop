import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, trancate: number): string {
    return `${value.split('').slice(0, trancate).join('')}...`;
  }
}
