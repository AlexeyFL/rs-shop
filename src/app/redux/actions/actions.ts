import { createAction, props } from '@ngrx/store';
import { Goods } from '../../shop/models/response-models';

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
