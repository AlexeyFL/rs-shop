import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core/components/main/main.component';
import { CartComponent } from './shop/components/cart/cart.component';
import { FavoriteComponent } from './shop/components/favorite/favorite.component';
import { GoodPageComponent } from './shop/components/good-page/good-page.component';
import { NewCategoryPageComponent } from './shop/components/new-category-page/new-category-page.component';
import { SubcategoryPageComponent } from './shop/components/subcategory-page/subcategory-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'favorite',
    component: FavoriteComponent,
  },
 /*  {
    path: 'categories/:categoryId',
    redirectTo: ':categoryId',
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: ':categoryId',
    component: CategoryPageComponent,
  },
  {
    path: ':categoryId/:goodId',
    component: GoodPageComponent,
  }, */
  {
    path: ':categoryId',
    component: NewCategoryPageComponent,
  },
  {
    path: ':categoryId/:subCategoryId',
    component: SubcategoryPageComponent,
  },
  {
    path: ':categoryId/:subCategoryId/:goodId',
    component: GoodPageComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
