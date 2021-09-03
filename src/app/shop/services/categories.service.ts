import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { localUrl } from '../../constants';
import { MainCategory, Response } from '../models/response-models';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories$!: Observable<MainCategory[]>;

  categories$$ = new BehaviorSubject<MainCategory[]>([]);

  constructor(private http: HttpClient) {
    this.categories$ = this.categories$$.asObservable();
  }

  getCategories() {
    return this.http
      .get<Response>(localUrl)
      .pipe(map((data) => data.categories))
      .subscribe((data: MainCategory[]) => {
        this.categories$$.next(data);
      });
  }
}
