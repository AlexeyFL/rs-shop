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

  category!: string;

  paramsSubscription!: Subscription;

  categorySubscription!: Subscription;

  categoryGoodsSubscription!: Subscription;

  subCategoryGoodsSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    public databaseService: DatabaseService,
  ) {
    this.goods = [];
  }

  ngOnInit(): void {
    this.categoryGoodsSubscription =
      this.databaseService.currentCategory$.subscribe((data) => {
        if (data !== '') {
          this.databaseService.getGoodsByCategoryId(data, 0, 10);
        }
      });
    this.databaseService.categoryGoods$.subscribe((data) => {
      this.goods = data;
    });

    this.subCategoryGoodsSubscription =
      this.databaseService.currentSubCategory$$
        .pipe(
          map((currentSubCategory: string) => currentSubCategory),
          map((currentSubCategory: string) => {
            this.categorySubscription =
              this.databaseService.currentCategory$.subscribe(
                (currentCategory) => {
                  if (currentSubCategory !== '') {
                    this.databaseService.getGoodsBySubCategoryId(
                      currentCategory,
                      currentSubCategory,
                      0,
                      10,
                    );
                  }
                },
              );

            return currentSubCategory;
          }),
        )
        .subscribe();
    this.databaseService.subCategoryGoods$.subscribe((data) => {
      this.goods = data;
    });

    this.paramsSubscription = this.route.params
      .pipe(map((params: Params) => params))
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
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
