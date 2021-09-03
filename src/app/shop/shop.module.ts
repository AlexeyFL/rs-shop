import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserLocationComponent } from './components/user-location/user-location.component';
import { SharedModule } from '../shared/shared.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { WorktimeComponent } from './components/worktime/worktime.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchComponent } from './components/search/search.component';
import { AuthModule } from '../auth/auth.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { SubcategoriesComponent } from './components/subcategories/subcategories.component';

@NgModule({
  declarations: [
    UserLocationComponent,
    ContactsComponent,
    WorktimeComponent,
    NavigationComponent,
    SearchComponent,
    CategoriesComponent,
    SubcategoriesComponent,
  ],
  imports: [
    CommonModule,
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
  ],
})
export class ShopModule {}
