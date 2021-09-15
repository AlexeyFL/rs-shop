import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { categoriesUrl, goodsSearchUrl } from '../../constants';
import {
  MainCategory,
  SubCategory,
  Good,
  Goods,
  Category,
} from '../models/response-models';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  currentCategory$!: Observable<string>;

  currentCategory$$ = new BehaviorSubject<string>('');

  currentSubCategory$!: Observable<string>;

  currentSubCategory$$ = new BehaviorSubject<string>('');

  categories$!: Observable<MainCategory[]>;

  categories$$ = new BehaviorSubject<MainCategory[]>([]);

  category$!: Observable<Category[]>;

  category$$ = new BehaviorSubject<Category[]>([]);

  subCategory$!: Observable<SubCategory[]>;

  subCategory$$ = new BehaviorSubject<SubCategory[]>([]);

  categoryGoods$!: Observable<Good[]>;

  categoryGoods$$ = new BehaviorSubject<Good[]>([]);

  subCategoryGoods$!: Observable<Good[]>;

  subCategoryGoods$$ = new BehaviorSubject<Good[]>([]);

  good$!: Observable<Good>;

  good$$ = new Subject<Good>();

  goods$!: Observable<Good[]>;

  goods$$ = new BehaviorSubject<Good[]>([]);

  allGoods$!: Observable<Goods>;

  allGoods$$ = new Subject<Goods>();

  searchedCategories$!: Observable<Category[]>;

  searchedCategories$$ = new BehaviorSubject<Category[]>([]);

  constructor(private http: HttpClient) {
    this.categories$ = this.categories$$.asObservable();
    this.category$ = this.category$$.asObservable();
    this.subCategory$ = this.subCategory$$.asObservable();
    this.goods$ = this.goods$$.asObservable();
    this.searchedCategories$ = this.searchedCategories$$.asObservable();
    this.currentCategory$ = this.currentCategory$$.asObservable();
    this.currentSubCategory$ = this.currentSubCategory$$.asObservable();
    this.categoryGoods$ = this.categoryGoods$$.asObservable();
    this.subCategoryGoods$ = this.subCategoryGoods$$.asObservable();
    this.good$ = this.good$$.asObservable();
    this.allGoods$ = this.allGoods$$.asObservable();
  }

  getCurrentCategory(categoryId: string) {
    this.currentCategory$$.next(categoryId);
  }

  getCurrentSubCategory(categoryId: string) {
    this.currentSubCategory$$.next(categoryId);
  }

  getCategories() {
    return this.http
      .get<MainCategory[]>(categoriesUrl)
      .pipe(map((data: MainCategory[]) => data))
      .subscribe((data: MainCategory[]) => {
        this.categories$$.next(data);
      });
  }

  getCategoryById(id: string) {
    return this.http
      .get<MainCategory[]>(categoriesUrl)
      .pipe(
        map((data: MainCategory[]) => {
          const categories: Category[] = [];
          data.forEach((category) => {
            if (category.id === id) {
              categories.push(category);
            }

            category.subCategories.forEach((subCategory) => {
              if (subCategory.id === id) {
                categories.push(subCategory);
              }
            });
          });
          return categories;
        }),
      )
      .subscribe((data: Category[]) => {
        this.category$$.next(data);
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

  getGoodsByCategory(categoryId: string | undefined) {
    return this.http
      .get<Goods>('http://localhost:3004/goods/')
      .pipe(
        map((goods: any) => {
          const categories = Object.keys(goods);
          const categoryGoods: any = [];
          categories.forEach((category: string) => {
            const subCategories = Object.keys(goods[category]);
            return subCategories.forEach((subcategory: string) => {
              if (category === categoryId || subcategory === categoryId) {
                categoryGoods.push(goods[category][subcategory]);
              }
            });
          });

          return categoryGoods.flat();
        }),
      )
      .subscribe((data) => {
        this.categoryGoods$$.next(data);
      });
  }

  getGoodsByCategoryId(
    categoryId: string | undefined,
    start: number,
    count: number,
  ) {
    return this.http
      .get<Good[]>(
        `http://localhost:3004/goods/category/${categoryId}?start=${start}&count=${count}`,
      )
      .pipe(map((data) => data))
      .subscribe((data) => {
        this.categoryGoods$$.next(data);
      });
  }

  getGoodsBySubCategoryId(
    categoryId: string,
    subcategoryId: string,
    start: number,
    count: number,
  ) {
    return this.http
      .get<Good[]>(
        `http://localhost:3004/goods/category/${categoryId}/${subcategoryId}?start=${start}&count=${count}`,
      )
      .pipe(map((data) => data))
      .subscribe((data) => {
        this.subCategoryGoods$$.next(data);
      });
  }

  getGoodById(goodId: string) {
    return this.http
      .get<Good>(`http://localhost:3004/goods/item/${goodId}`)
      .pipe(map((data) => data))
      .subscribe((data) => {
        this.good$$.next(data);
      });
  }

  /*   getAllGoods(amount: number) {
    return this.http.get<Goods>('http://localhost:3004/goods/').pipe(
      map((goods: any) => {
        const categories = Object.keys(goods);
        const allGoods: any = [];
        categories.forEach((category: string) => {
          const subCategories = Object.keys(goods[category]);
          subCategories.forEach((subcategory: string, index: number) => {
            if (amount < index) {
              allGoods.push(goods[category][subcategory]);
            }
          });
        });

        return allGoods.flat();
      }),
    );
  } */

  getAllGoods(amount: number) {
    return this.http.get<Goods>('http://localhost:3004/goods/').pipe(
      map((goods: Goods) => {
        console.log(goods);
        return goods;
      }),
    );
  }
}
