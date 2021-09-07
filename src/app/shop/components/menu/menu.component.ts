import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MainCategory } from '../../models/response-models';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  categories: MainCategory[];

  constructor(private databaseService: DatabaseService) {
    this.categories = [];
  }

  ngOnInit() {
    this.databaseService.getCategories();
    this.databaseService.categories$
      .pipe(map((data: MainCategory[]) => data))
      .subscribe((data) => {
        this.categories = data;
      });
  }
}
