export interface SubCategory {
  id: string;
  name: string;
}

export interface Good {
  goodId: number;
  category: number[];
  imageUrl: string;
  name: string;
  rate: number;
  price: number;
  amount: number;
  popular: number;
}

export interface MainCategory {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export interface Response {
  cities: string[];
  categories: MainCategory[];
  goods: Good[];
}
