import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Good } from '../models/response-models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: any = [];

  cartGoods$!: Observable<Good[]>;

  cartGoods$$ = new BehaviorSubject<Good[]>([]);

  addToCart(good: Good[]) {
    this.cartGoods$$.next(good);
  }
}
