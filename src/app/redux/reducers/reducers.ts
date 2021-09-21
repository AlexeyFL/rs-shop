import { Action, createReducer, on } from '@ngrx/store';
import * as GoodsActions from '../actions/actions';
import { initialState, ShopState } from '../state';

const reducer = createReducer(
  initialState,
  on(GoodsActions.getGoods, (state) => ({
    ...state,
    loading: true,
  })),
  on(GoodsActions.getGoodsSuccesful, (state, { goods }) => ({
    ...state,
    goods,
    loading: false,
    loaded: true,
  })),
  on(GoodsActions.getGoodsFailed, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    loaded: false,
  })),

  on(GoodsActions.getGoodById, (state) => ({
    ...state,
    isInCart: true,
  })),
  on(GoodsActions.getGoodByIdSuccesful, (state, { good }) => ({
    ...state,
    good,
    loading: false,
    loaded: true,
  })),
  on(GoodsActions.getGoodByIdFailed, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    loaded: false,
  })),
);

export function shopReducer(state: ShopState, action: Action) {
  return reducer(state, action);
}
