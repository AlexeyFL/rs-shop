import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { SwiperModule } from 'swiper/angular';
import * as fromShopReducer from '../redux/reducers/reducers';

import { UserLocationComponent } from './components/user-location/user-location.component';
import { SharedModule } from '../shared/shared.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { WorktimeComponent } from './components/worktime/worktime.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchComponent } from './components/search/search.component';
import { AuthModule } from '../auth/auth.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { SubcategoriesComponent } from './components/subcategories/subcategories.component';
import { MenuComponent } from './components/menu/menu.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { GoodsPageComponent } from './components/goods-page/goods-page.component';
import { GoodPageComponent } from './components/good-page/good-page.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { CartComponent } from './components/cart/cart.component';
import { ShopEffects } from '../redux/effects/effects';
import { CarouselComponent } from './components/carousel/carousel.component';
import { PopularCarouselComponent } from './components/popular-carousel/popular-carousel.component';

@NgModule({
  declarations: [
    UserLocationComponent,
    ContactsComponent,
    WorktimeComponent,
    NavigationComponent,
    SearchComponent,
    CategoriesComponent,
    SubcategoriesComponent,
    MenuComponent,
    CategoryPageComponent,
    GoodsPageComponent,
    GoodPageComponent,
    ShortenPipe,
    SortPipe,
    CartComponent,
    CarouselComponent,
    PopularCarouselComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    AuthModule,
    SwiperModule,
    HttpClientModule,
    StoreModule.forFeature('shopState', fromShopReducer.shopReducer),
    EffectsModule.forFeature([ShopEffects]),
  ],
  exports: [
    UserLocationComponent,
    ContactsComponent,
    WorktimeComponent,
    NavigationComponent,
    MenuComponent,
    GoodsPageComponent,
    CartComponent,
    CarouselComponent,
    PopularCarouselComponent,
  ],
})
export class ShopModule {}
