import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MainCategory } from '../../models/response-models';
import { DatabaseService } from '../../services/database.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  showMenu: boolean = false;

  categories: MainCategory[];

  constructor(
    private databaseService: DatabaseService,
    public categoryService: CategoryService,
  ) {
    this.categories = [];
  }

  ngOnInit() {
    this.databaseService.getCategories();
    this.databaseService.categories$
      .pipe(map((data: MainCategory[]) => data))
      .subscribe((data) => {
        this.categories = data;
      });
  }

  getGoods(categoryId: string) {
    this.databaseService.getGoodsByCategoryId(categoryId, 0, 10);
  }

  onClosePopup() {
    this.categoryService.showHideCategoryPopup(false);
  }

  showMobileMenu() {
    this.showMenu = !this.showMenu;
  }
}
