export interface SubCategory {
  id: string;
  name: string;
}

export interface User {
  email: string;
  username: string;
}

export interface Good {
  id: string;
  name: string;
  imageUrls: string[];
  availableAmount: number;
  price: number;
  rating: number;
  description: number;
  isInCart: boolean;
  isFavorite: boolean;
  category: string;
  subCategory: string;
}

export interface Appliances {
  refrigerators: Good[];
  cookers: Good[];
  dishwashers: Good[];
  freezers: Good[];
  microwaves: Good[];
  teapots: Good[];
  'washing-machines': Good[];
  irons: Good[];
  vacuum: Good[];
}

export interface Electronics {
  mobile: Good[];
  watches: Good[];
  tablets: Good[];
  ebooks: Good[];
  powerbanks: Good[];
  cameras: Good[];
  tvs: Good[];
  headphones: Good[];
}

export interface ComputersPeripherals {
  laptops: Good[];
  computers: Good[];
  consoles: Good[];
  hardware: Good[];
  peripherals: Good[];
  monitors: Good[];
}

export interface Furniture {
  sofas: Good[];
  armchairs: Good[];
  cabinets: Good[];
  chairs: Good[];
  tables: Good[];
  beds: Good[];
}

export interface Hobbies {
  'music-instruments': Good[];
  books: Good[];
  'fun-and-rest': Good[];
}

export interface Goods {
  appliances: Appliances;
  electronics: Electronics;
  'computers-peripherals': ComputersPeripherals;
  furniture: Furniture;
  hobbies: Hobbies;
}

export interface GoodByCategoryId {
  id: string;
  availableAmount: number;
  description: string;
  imageUrls: string[];
  name: string;
  price: number;
  rating: number;
  categoryId: string;
  subCategoryId: string;
}

export interface MainCategory {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export interface Category {
  categoryId?: string;
  categoryName?: string;
  id?: string;
  name?: string;
  subcategoryId?: string;
  subcategoryName?: string;
  subCategories?: SubCategory[];
}

export interface Response {
  cities: string[];
  categories: MainCategory[];
  goods: Good[];
}

export interface UserItems {
  id: string;
  amount: number;
}
export interface UserDetails {
  name: string;
  address: string;
  phone: string;
  timeToDeliver: string;
  comment: string;
}
export interface UserOrders {
  items: [UserItems];
  details: UserDetails;
  id: string;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  cart: string[];
  favorites: string[];
  orders: [UserOrders];
}
export interface UserToken {
  token?: string;
}
