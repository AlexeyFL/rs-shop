import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
} from '@angular/core';
import { SubCategory } from '../../models/response-models';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoriesComponent implements  OnChanges {
  @Input() subCategories!: SubCategory[] | null;

  // ngOnInit(): void {
  //   console.log('subCategories', this.subCategories);
  // }

  ngOnChanges() {
    console.log('subCategories', this.subCategories);
  }
}
