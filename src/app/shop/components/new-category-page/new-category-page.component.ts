import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GoodByCategoryId } from '../../models/response-models';
import { CategoryService } from '../../services/category.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-new-category-page',
  templateUrl: './new-category-page.component.html',
  styleUrls: ['./new-category-page.component.scss'],
})
export class NewCategoryPageComponent implements OnInit, OnDestroy {
  unsubscribeParams!: Subscription;

  unsubscribecustomCategory!: Subscription;

  goods: GoodByCategoryId[] = [];

  constructor(
    private route: ActivatedRoute,
    public databaseService: DatabaseService,
  ) {}

  ngOnInit(): void {
    this.unsubscribeParams = this.route.params.subscribe((data) => {
      this.databaseService.getSubcategoriesByCategoryId(data.categoryId);
      this.databaseService.getCategoryById(data.categoryId);
      this.databaseService.getGoodsByCategoryId(data.categoryId, 0, 10);
      this.databaseService.getGoodsByCategory(data.categoryId);

      this.unsubscribecustomCategory =
        this.databaseService.customCategoryGoods$.subscribe((data) => {
          this.goods = data.slice(0, 10);
        });
    });
  }

  ngOnDestroy() {
    this.unsubscribeParams.unsubscribe();
    this.unsubscribecustomCategory.unsubscribe();
  }
}
