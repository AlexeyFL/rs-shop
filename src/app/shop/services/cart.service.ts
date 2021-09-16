import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getGoods } from 'src/app/redux/actions/actions';
import { Good, Goods } from '../models/response-models';
import { AppState } from '../../redux/state';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  goods!: Observable<Goods | undefined>;

  cart: Good[] = [];

  cartGoods$!: Observable<Good[]>;

  cartGoods$$ = new BehaviorSubject<Good[]>([]);

  constructor(private store: Store<AppState>) {
    this.cartGoods$ = this.cartGoods$$.asObservable();
  }

  addToCartById(goodId: string) {
    this.goods = this.store.select((state) => state.shopState.goods);
    console.log('this.goods', this.goods);
  }

  addToCart(good: Good) {
    this.cart.push(good);

    this.cartGoods$$.next(this.cart);
  }
}
