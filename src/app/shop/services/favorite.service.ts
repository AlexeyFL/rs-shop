import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatabaseService } from './database.service';
import { Good, Goods, UserInfo } from '../models/response-models';
import { localUrl } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  goods!: Observable<Goods | undefined>;

  goodsIds: string[] = [];

  favoriteGoods: Good[] = [];

  favoriteGoods$!: Observable<Good[]>;

  favoriteGoods$$ = new BehaviorSubject<Good[]>([]);

  constructor(
    private databaseService: DatabaseService,
    private http: HttpClient,
  ) {
    this.favoriteGoods$ = this.favoriteGoods$$.asObservable();
  }

  getfavoriteGoods() {
    this.http
      .get<UserInfo>(`${localUrl}/users/userInfo`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`,
        ),
      })
      .subscribe((data) => {
        this.filterGoods(data.favorites);
      });
  }

  filterGoods(goods: string[]) {
    this.databaseService.getAllGoods();
    this.databaseService.allGoods$.subscribe((data) => {
      this.favoriteGoods = data.filter((item) => goods.includes(item.id));
      this.favoriteGoods$$.next(this.favoriteGoods);
    });
  }

  removeGood(id: string) {
    this.http
      .delete(`${localUrl}/users/favorites?id=${id}`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}` || '',
        ),
      })
      .subscribe();

    this.getfavoriteGoods();
  }

  addToFavorite(goodId: string) {
    this.http
      .post(
        `${localUrl}/users/favorites`,
        { id: goodId },
        {
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${localStorage.getItem('token')}` || '',
          ),
        },
      )
      .subscribe();
  }
}
