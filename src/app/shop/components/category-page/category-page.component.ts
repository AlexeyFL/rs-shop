import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Good } from '../../models/response-models';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  goods: Good[];

  paramsSubscription!: Subscription;

  categoryGoodsSubscription!: Subscription;

  subCategoryGoodsSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    public databaseService: DatabaseService,
  ) {
    this.goods = [];
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .pipe(
        map((params: Params) => {
          if (!params.subcategoryId) {
            this.databaseService.getGoodsByCategoryId(params.categoryId, 0, 10);
            this.categoryGoodsSubscription =
              this.databaseService.categoryGoods$.subscribe((data) => {
                this.goods = data;
              });
          } else {
            this.databaseService.getGoodsBySubCategoryId(
              params.categoryId,
              params.subcategoryId,
              0,
              10,
            );
            this.subCategoryGoodsSubscription =
              this.databaseService.subCategoryGoods$.subscribe((data) => {
                this.goods = data;
              });
          }

          return params;
        }),
      )
      .subscribe((data) => {
        this.databaseService.getCategoryById(data.categoryId);
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    if (this.categoryGoodsSubscription) {
      this.categoryGoodsSubscription.unsubscribe();
    }
    if (this.subCategoryGoodsSubscription) {
      this.subCategoryGoodsSubscription.unsubscribe();
    }
  }
}
