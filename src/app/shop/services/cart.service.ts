import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getGoods } from 'src/app/redux/actions/actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Good, Goods, UserInfo, UserToken } from '../models/response-models';
import { AppState } from '../../redux/state';
import { AuthService } from './auth.service';
import { localUrl } from '../../constants';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  goods!: Observable<Goods | undefined>;
  // userInfo!: Observable<Goods | undefined>;

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

  getUserInfo() {
    this.http
      .get<UserInfo>(`${localUrl}/users/userInfo`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`,
        ),
      })
      .subscribe((data) => {
        this.getCartGoods(data.cart);
      });
  }

  getCartGoods(goods: string[]) {
    this.databaseService.getAllGoods();
    this.databaseService.allGoods$.subscribe((data) => {
      this.cartGoods = data.filter((item) => goods.includes(item.id));
    });
  }

  removeGood(id: string){

  }

  addToCart(body: string) {
    this.http
      .post(
        `${localUrl}/users/cart`,
        { id: body },
        {
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${localStorage.getItem('token')}` || '',
          ),
        },
      )
      .subscribe((data) => {
        console.log('cart', data);
      });
  }
}
