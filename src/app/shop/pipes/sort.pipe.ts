import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(arr: any, sortBy: string, sortAscDesc: boolean) {
    return arr.sort((itemA: any, itemB: any) => {
      if (sortAscDesc) {
        return itemA[sortBy] - itemB[sortBy];
      } else {
        return itemB[sortBy] - itemA[sortBy];
      }
    });
  }
}
