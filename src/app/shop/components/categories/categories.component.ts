import { Component, OnInit } from '@angular/core';
import { MainCategory, SubCategory } from '../../models/response-models';
import { DatabaseService } from '../../services/database.service';
import { icons } from '../../../constants';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categoryIcons: string[] = icons;

  currentSubCategories!: SubCategory[];

  categories!: MainCategory[];

  constructor(public databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getCategories();
    this.databaseService.categories$.subscribe((data) => {
      if (data[0]?.id) {
        this.databaseService.getSubcategoryById(data[0]?.id);
      }
    });
  }

  currentSubCategory(id: string) {
    this.databaseService.getSubcategoryById(id);
  }
}
