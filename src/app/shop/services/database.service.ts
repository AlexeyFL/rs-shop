import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { categoriesUrl, goodsSearchUrl, localUrl } from '../../constants';
import {
  MainCategory,
  SubCategory,
  Good,
  Goods,
  Category,
  GoodByCategoryId,
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

  subCategoryById$!: Observable<Category[]>;

  subCategoryById$$ = new BehaviorSubject<Category[]>([]);

  subCategory$!: Observable<SubCategory[]>;

  subCategory$$ = new BehaviorSubject<SubCategory[]>([]);

  categoryGoods$!: Observable<Good[]>;

  categoryGoods$$ = new BehaviorSubject<Good[]>([]);

  customCategoryGoods$!: Observable<GoodByCategoryId[]>;

  customCategoryGoods$$ = new BehaviorSubject<GoodByCategoryId[]>([]);

  subCategoryGoods$!: Observable<Good[]>;

  subCategoryGoods$$ = new BehaviorSubject<Good[]>([]);

  good$!: Observable<Good>;

  good$$ = new Subject<Good>();

  goods$!: Observable<Good[]>;

  goods$$ = new BehaviorSubject<Good[]>([]);

  allGoods$!: Observable<Good[]>;

  allGoods$$ = new BehaviorSubject<Good[]>([]);

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
    this.subCategoryById$ = this.subCategoryById$$.asObservable();
    this.customCategoryGoods$ = this.customCategoryGoods$$.asObservable();
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

  getSubcategoriesByCategoryId(id: string) {
    return this.http
      .get<MainCategory[]>(categoriesUrl)
      .pipe(
        map((data: MainCategory[]) =>
          data.filter((item: MainCategory) => item.id === id)),
        map((data: MainCategory[]) => data[0].subCategories),
      )
      .subscribe((data: SubCategory[]) => {
        this.subCategory$$.next(data);
      });
  }

  getSubcategoryById(id: string) {
    return this.http
      .get<MainCategory[]>(categoriesUrl)
      .pipe(
        map((data: MainCategory[]) => {
          const result: SubCategory[] = [];
          data.forEach((category) => {
            if (category.id !== id) {
              category.subCategories.forEach((subCategory) => {
                if (subCategory.id === id) {
                  result.push(subCategory);
                }
              });
            } else {
              result.push(category);
            }
          });

          return result;
        }),
      )
      .subscribe((data: SubCategory[]) => {
        this.subCategoryById$$.next(data);
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
              categories.push({
                categoryId: category.id,
                categoryName: category.name,
                subCategories: [...category.subCategories],
              });
            }

            category.subCategories.forEach((subCategory) => {
              if (subCategory.name.toLowerCase().indexOf(name) >= 0) {
                categories.push({
                  categoryId: category.id,
                  categoryName: category.name,
                  subcategoryId: subCategory.id,
                  subcategoryName: subCategory.name,
                });
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
      .get<Goods>(`${localUrl}/goods/`)
      .pipe(
        map((goods: any) => {
          const categories = Object.keys(goods);
          const categoryGoods: any = [];
          categories.forEach((category: any) => {
            const subCategories = Object.keys(goods[category]);
            return subCategories.forEach((subcategory: any) => {
              if (category === categoryId || subcategory === categoryId) {
                goods[category][subcategory].forEach((item: any) => {
                  categoryGoods.push({
                    id: item.id,
                    availableAmount: item.availableAmount,
                    description: item.description,
                    imageUrls: [...item.imageUrls],
                    name: item.name,
                    price: item.price,
                    rating: item.rating,
                    categoryId: category,
                    subCategoryId: subcategory,
                  });
                });
                // categoryGoods.push(goods[category][subcategory]);
              }
            });
          });

          return categoryGoods.flat();
          // return categoryGoods;
        }),
      )
      .subscribe((data) => {
        this.customCategoryGoods$$.next(data);
      });
  }

  getGoodsByCategoryId(
    categoryId: string | undefined,
    start: number,
    count: number,
  ) {
    return this.http
      .get<Good[]>(
        `${localUrl}/goods/category/${categoryId}?start=${start}&count=${count}`,
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
        `${localUrl}/goods/category/${categoryId}/${subcategoryId}?start=${start}&count=${count}`,
      )
      .pipe(map((data) => data))
      .subscribe((data) => {
        this.subCategoryGoods$$.next(data);
      });
  }

  getGoodById(goodId: string) {
    return this.http
      .get<Good>(`${localUrl}/goods/item/${goodId}`)
      .pipe(map((data) => data))
      .subscribe((data) => {
        this.good$$.next(data);
      });
  }

  getAllGoods() {
    return this.http
      .get<Goods>(`${localUrl}/goods/`)
      .pipe(
        map((goods: any) => {
          const allGoods: any = [];
          const categories = Object.keys(goods);
          categories.forEach((category) => {
            const subCategories = Object.keys(goods[category]);
            subCategories.forEach((subCategory) => {
              goods[category][subCategory].forEach((item: any) => {
                allGoods.push({
                  availableAmount: item.availableAmount,
                  description: item.description,
                  id: item.id,
                  imageUrls: [...item.imageUrls],
                  name: item.name,
                  price: item.price,
                  rating: item.rating,
                  category,
                  subCategory,
                });
              });
            });
          });

          return allGoods.flat();
        }),
      )
      .subscribe((data) => {
        this.allGoods$$.next(data);
      });
  }
}
