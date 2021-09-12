import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SubCategory } from '../../models/response-models';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubcategoriesComponent {
  @Input() subCategories!: SubCategory[] | null;

  @Input() parentCategory!: string;

  constructor(private databaseService: DatabaseService) {}

  onPassSubCategory(subCategory: string) {
    this.databaseService.getCurrentSubCategory(subCategory);
    this.databaseService.getCurrentCategory(this.parentCategory);
  }
}
