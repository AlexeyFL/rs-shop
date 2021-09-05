import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { categoriesUrl, goodsSearchUrl } from '../../constants';
import {
  MainCategory,
  SubCategory,
  Good,
  Category,
} from '../models/response-models';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  categories$!: Observable<MainCategory[]>;

  categories$$ = new BehaviorSubject<MainCategory[]>([]);

  subCategory$!: Observable<SubCategory[]>;

  subCategory$$ = new BehaviorSubject<SubCategory[]>([]);

  goods$!: Observable<Good[]>;

  goods$$ = new BehaviorSubject<Good[]>([]);

  searchedCategories$!: Observable<Category[]>;

  searchedCategories$$ = new BehaviorSubject<Category[]>([]);

  constructor(private http: HttpClient) {
    this.categories$ = this.categories$$.asObservable();
    this.subCategory$ = this.subCategory$$.asObservable();
    this.goods$ = this.goods$$.asObservable();
    this.searchedCategories$ = this.searchedCategories$$.asObservable();
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

  getCategoryByName(name: string) {
    return this.http
      .get<MainCategory[]>(categoriesUrl)
      .pipe(
        map((data: MainCategory[]) => {
          if (name.length < 2) {
            return [];
          }
          const categories: Category[] = [];
          data.forEach((category) => {
            if (category.name.toLowerCase().indexOf(name) >= 0) {
              categories.push(category);
            }
            category.subCategories.forEach((subCategory) => {
              if (subCategory.name.toLowerCase().indexOf(name) >= 0) {
                categories.push(subCategory);
              }
            });
          });
          return categories;
        }),
      )
      .subscribe((data: Category[]) => {
        this.searchedCategories$$.next(data);
      });
  }

  getGoodByName(name: string) {
    return this.http
      .get<Good[]>(`${goodsSearchUrl}${name}`)
      .pipe(
        map((data: Good[]) => {
          if (name.length < 2) {
            return [];
          }
          return data;
        }),
      )
      .subscribe((data: Good[]) => {
        this.goods$$.next(data);
      });
  }
}
