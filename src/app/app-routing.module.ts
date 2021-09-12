import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core/components/main/main.component';
import { CategoriesComponent } from './shop/components/categories/categories.component';
import { CategoryPageComponent } from './shop/components/category-page/category-page.component';
import { GoodPageComponent } from './shop/components/good-page/good-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
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
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
