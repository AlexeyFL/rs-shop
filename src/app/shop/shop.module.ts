import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
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
  ],
  imports: [
    CommonModule,
    // ShopRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    AuthModule,
    HttpClientModule,
  ],
  exports: [
    UserLocationComponent,
    ContactsComponent,
    WorktimeComponent,
    NavigationComponent,
    MenuComponent,
    GoodsPageComponent,
  ],
})
export class ShopModule {}
