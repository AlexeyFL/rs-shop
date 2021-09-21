import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Good, Goods, UserInfo } from '../models/response-models';
import { AuthService } from './auth.service';
import { localUrl } from '../../constants';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  goods!: Observable<Goods | undefined>;

  goodsIds: string[] = [];

  cartGoods: Good[] = [];

  cartGoods$!: Observable<Good[]>;

  cartGoods$$ = new BehaviorSubject<Good[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private databaseService: DatabaseService,
  ) {
    this.cartGoods$ = this.cartGoods$$.asObservable();
  }

  getCartGoods() {
    this.http
      .get<UserInfo>(`${localUrl}/users/userInfo`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`,
        ),
      })
      .subscribe((data) => {
        this.filterGoods(data.cart);
      });
  }

  filterGoods(goods: string[]) {
    this.databaseService.getAllGoods();
    this.databaseService.allGoods$.subscribe((data) => {
      this.cartGoods = data.filter((item) => goods.includes(item.id));
      this.cartGoods$$.next(this.cartGoods);
    });
  }

  removeGood(id: string) {
    this.http
      .delete(`${localUrl}/users/cart?id=${id}`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}` || '',
        ),
      })
      .subscribe();

    this.getCartGoods();
  }

  addToCart(goodId: string) {
    this.http
      .post(
        `${localUrl}/users/cart`,
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
