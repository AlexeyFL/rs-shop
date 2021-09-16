import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-new-category-page',
  templateUrl: './new-category-page.component.html',
  styleUrls: ['./new-category-page.component.scss'],
})
export class NewCategoryPageComponent implements OnInit, OnDestroy {
  unsubscribeParams!: Subscription;

  constructor(
    private route: ActivatedRoute,
    public databaseService: DatabaseService,
  ) {

  }

  ngOnInit(): void {
    this.unsubscribeParams = this.route.params.subscribe((data) => {
      this.databaseService.getSubcategoriesByCategoryId(data.categoryId);
      this.databaseService.getCategoryById(data.categoryId);
    });
  }

  ngOnDestroy() {
    this.unsubscribeParams.unsubscribe();
  }
}
