import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  showCategoryPopup$!: Observable<boolean>;

  showCategoryPopup$$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.showCategoryPopup$ = this.showCategoryPopup$$.asObservable();
  }

  showHideCategoryPopup(value: boolean) {
    this.showCategoryPopup$$.next(value);
  }
}
