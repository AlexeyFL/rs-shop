import { Goods, Good } from '../shop/models/response-models';

export interface AppState {
  shopState: ShopState;
}

export interface ShopState {
  goods?: Goods;
  loading?: boolean;
  loaded?: boolean;
  error?: Error;
  cart?: Good[]
}

export const initialState: ShopState = {
  // goods:[],
  // loading: false,
  // loaded: false,
};
