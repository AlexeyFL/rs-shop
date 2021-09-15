import { Goods } from '../shop/models/response-models';

export interface AppState {
  shopState: ShopState;
}

export interface ShopState {
  goods?: Goods;
  loading?: boolean;
  loaded?: boolean;
  error?: Error;
}

export const initialState: ShopState = {
  // goods:[],
  // loading: false,
  // loaded: false,
};
