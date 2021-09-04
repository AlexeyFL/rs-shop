import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { categoriesUrl } from '../../constants';
import { MainCategory, SubCategory } from '../models/response-models';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  categories$!: Observable<MainCategory[]>;

  categories$$ = new BehaviorSubject<MainCategory[]>([]);

  subCategory$!: Observable<SubCategory[]>;

  subCategory$$ = new BehaviorSubject<SubCategory[]>([]);

  constructor(private http: HttpClient) {
    this.categories$ = this.categories$$.asObservable();
    this.subCategory$ = this.subCategory$$.asObservable();
  }

  getCategories() {
    return this.http
      .get<MainCategory[]>(categoriesUrl)
      .pipe(map((data: MainCategory[]) => data))
      .subscribe((data: MainCategory[]) => {
        this.categories$$.next(data);
      });
  }

  getSubcategoryById(id: string) {
    return this.http
      .get<MainCategory[]>(categoriesUrl)
      .pipe(
        map((data: MainCategory[]) =>
          data.filter((item: MainCategory) => item.id === id),
        ),
        map((data: MainCategory[]) => data[0].subCategories),
      )
      .subscribe((data: SubCategory[]) => {
        this.subCategory$$.next(data);
      });
  }
}
