import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MainCategory, SubCategory } from '../../models/response-models';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  currentSubCategories!: SubCategory[];

  categories!: MainCategory[];

  constructor(public databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getCategories();
    this.databaseService.getSubcategoryById('appliances');
  }

  currentSubCategory(id: string) {
    this.databaseService.getSubcategoryById(id);
  }
}
