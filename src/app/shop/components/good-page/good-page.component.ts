import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Good } from '../../models/response-models';
import { DatabaseService } from '../../services/database.service';

export type BreadcrumbsCategory = {
  id: string | undefined;
  name: string | undefined;
  subCategories?: [];
};

@Component({
  selector: 'app-good-page',
  templateUrl: './good-page.component.html',
  styleUrls: ['./good-page.component.scss'],
})
export class GoodPageComponent implements OnInit, OnDestroy {
  @ViewChild('mainImage') mainImage!: ElementRef;

  selectedItem: number = 0;

  currentSrc!: string;

  unsubscribeParams!: Subscription;

  unsubscribeGood!: Subscription;

  unsubscribeSubcategoryById!: Subscription;

  unsubscribeCategoryById!: Subscription;

  breadcrumbsSubCategory!: BreadcrumbsCategory;

  breadcrumbsCategory!: BreadcrumbsCategory;

  good!: Good;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.unsubscribeParams = this.route.params
      .pipe(
        map((params) => {
          this.databaseService.getGoodById(params.goodId);
          this.databaseService.getSubcategoryById(params.subCategoryId);
          this.databaseService.getCategoryById(params.categoryId);
        }),
      )
      .subscribe();

    this.unsubscribeGood = this.databaseService.good$.subscribe((data) => {
      if (data) {
        this.good = data;
      }
    });

    this.unsubscribeSubcategoryById =
      this.databaseService.subCategoryById$.subscribe((data) => {
        this.breadcrumbsSubCategory = { name: data[0]?.name, id: data[0]?.id };
      });

    this.unsubscribeCategoryById = this.databaseService.category$.subscribe(
      (data) => {
        this.breadcrumbsCategory = {
          name: data[0]?.name,
          id: data[0]?.id,
          subCategories: [],
        };
      },
    );
  }

  getCurrentUrl(e: Event, index: number) {
    this.selectedItem = index;
    this.mainImage.nativeElement.src = (e.target as HTMLImageElement).src;
  }

  navigateTo(data: BreadcrumbsCategory) {
    if (!data.subCategories) {
      this.router.navigate(['/', this.breadcrumbsCategory.id, data.id]);
    } else {
      this.router.navigate(['/', data.id]);
    }
  }

  ngOnDestroy() {
    this.unsubscribeParams.unsubscribe();
    this.unsubscribeGood.unsubscribe();
    this.unsubscribeCategoryById.unsubscribe();
    this.unsubscribeSubcategoryById.unsubscribe();
  }
}
