import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('search') search!: ElementRef;

  @ViewChild('searchList') searchList!: ElementRef;

  constructor(public dataBaseService: DatabaseService, private router: Router) {
  }

  ngAfterViewInit() {
    this.searchResults();
  }

  searchResults() {
    fromEvent(this.search?.nativeElement, 'keyup')
      .pipe(
        map((event: any) => (event.target as HTMLInputElement).value),
        debounceTime(1000),
        // distinctUntilChanged(),
        map((value) => {
          this.dataBaseService.getCategoryByName(value);
          this.dataBaseService.getGoodByName(value);
          return value;
        }),
      )
      .subscribe();
  }

  passCategoryId(categoryId: string | undefined) {
    this.dataBaseService.getGoodsByCategoryId(categoryId, 0, 10);
    this.dataBaseService.getGoodsByCategory(categoryId);
  }

  clearSearch() {
    this.search.nativeElement.value = '';
    this.dataBaseService.getCategoryByName('');
    this.dataBaseService.getGoodByName('');
  }
}
