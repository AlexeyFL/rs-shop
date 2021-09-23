import { createAction, props } from '@ngrx/store';
import { Goods, Good } from '../../shop/models/response-models';

export const getGoods = createAction(
  '[CATEGORIES PAGE] GET ALL GOODS',
  props<{ amount: number }>(),
);

export const getGoodsSuccesful = createAction(
  '[GOODS EFFECT] SET FETCHED GOODS',
  props<{ goods: Goods }>(),
);

export const getGoodsFailed = createAction(
  '[GOODS EFFECT] FETCHED GOODS FAILED',
  props<{ error: Error }>(),
);

export const getGoodById = createAction(
  '[CART SERVICE] GET GOOD BY ID',
  props<{ goodId: string }>(),
);

export const getGoodByIdSuccesful = createAction(
  '[GOODS EFFECT] SET FETCHED GOOD',
  props<{ good: Good }>(),
);

export const getGoodByIdFailed = createAction(
  '[GOODS EFFECT] FETCHED GOOD FAILED',
  props<{ error: Error }>(),
);
