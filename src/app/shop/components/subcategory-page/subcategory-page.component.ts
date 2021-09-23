import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-subcategory-page',
  templateUrl: './subcategory-page.component.html',
  styleUrls: ['./subcategory-page.component.scss'],
})
export class SubcategoryPageComponent implements OnInit, OnDestroy {
  unsubscribeRoute!: Subscription;

  unsubscribeSubcategoryById!: Subscription;

  unsubscribeCategoryById!: Subscription;

  breadcrumbsCategory: string | undefined = '';

  breadcrumbsSubCategory: string | undefined = '';

  constructor(
    private route: ActivatedRoute,
    public databaseService: DatabaseService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.unsubscribeRoute = this.route.params.subscribe((data) => {
      this.databaseService.getGoodsBySubCategoryId(
        data.categoryId,
        data.subCategoryId,
        0,
        10,
      );
      this.databaseService.getSubcategoryById(data.subCategoryId);
      this.databaseService.getCategoryById(data.categoryId);
    });

    this.unsubscribeSubcategoryById =
      this.databaseService.subCategoryById$.subscribe((data) => {
        this.breadcrumbsSubCategory = data[0]?.name;
      });
  }

  navigateTo(id: string | undefined) {
    this.router.navigate(['/', id]);
  }

  ngOnDestroy() {
    this.unsubscribeRoute.unsubscribe();
    this.unsubscribeSubcategoryById.unsubscribe();
  }
}
