import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { DatabaseService } from 'src/app/shop/services/database.service';
import { catchError, switchMap, map } from 'rxjs/operators';
import { CartService } from '../../shop/services/cart.service';
import { Goods } from '../../shop/models/response-models';
import {
  getGoods,
  getGoodsSuccesful,
  getGoodsFailed,
} from '../actions/actions';

@Injectable()
export class ShopEffects {
  constructor(
    private actions: Actions,
    private databaseService: DatabaseService,
    private cartService: CartService,
  ) {}

  getGoods: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(getGoods),
      switchMap((action) =>
        this.databaseService.getAllGoods(action.amount).pipe(
          map((goods: any) => getGoodsSuccesful({ goods })),
          catchError((error) => of(getGoodsFailed({ error }))),
        ),
      ),
    ),
  );
}
