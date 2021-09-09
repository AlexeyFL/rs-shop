import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../core/components/main/main.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { SubcategoryPageComponent } from './components/subcategory-page/subcategory-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'categories',
    redirectTo: '',
  },
  {
    path: ':categoryId',
    component: CategoryPageComponent,
  },
  {
    path: ':categoryId/:subcategoryId',
    component: CategoryPageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class ShopRoutingModule {}
