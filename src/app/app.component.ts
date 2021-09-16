import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './redux/state';
import { getGoods } from './redux/actions/actions';
import { DatabaseService } from './shop/services/database.service';
import { CategoryService } from './shop/services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rs-shop';

  selectedItem: number = 0;

  constructor(
    private store: Store<AppState>,
    public databaseService: DatabaseService,
    public categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.store.dispatch(getGoods({ amount: 3 }));
    this.databaseService.getCategories();
  }

  getCurrent(index: number) {
    this.selectedItem = index;
  }

  onClosePopup() {
    this.categoryService.showHideCategoryPopup(false);
  }
}
