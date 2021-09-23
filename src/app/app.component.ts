import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './redux/state';
import { DatabaseService } from './shop/services/database.service';
import { CategoryService } from './shop/services/category.service';
import { CartService } from './shop/services/cart.service';
import { AuthService } from './shop/services/auth.service';
import { icons } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rs-shop';

  selectedItem: number = 0;

  categoryIcons: string[] = icons;

  constructor(
    private store: Store<AppState>,
    public databaseService: DatabaseService,
    public categoryService: CategoryService,
    public cartService: CartService,
    private authService: AuthService,
  ) {
    this.authService.registerUser();
    this.authService.loginUser();
  }

  ngOnInit() {
    this.databaseService.getCategories();
  }

  getCurrent(index: number) {
    this.selectedItem = index;
  }

  onClosePopup() {
    this.categoryService.showHideCategoryPopup(false);
  }
}
