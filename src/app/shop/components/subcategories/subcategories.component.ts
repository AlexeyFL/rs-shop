import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SubCategory } from '../../models/response-models';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoriesComponent {
  @Input() subCategories!: SubCategory[] | null;
}
