import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('search') search!: ElementRef;

  constructor(public dataBaseService: DatabaseService) {}

  ngAfterViewInit() {
    this.searchResults();
  }

  searchResults() {
    fromEvent(this.search?.nativeElement, 'input')
      .pipe(
        map((event: any) => (event.target as HTMLInputElement).value),
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe((data) => {
        this.dataBaseService.getGoodByName(data);
        this.dataBaseService.getCategoryByName(data);
      });
  }
}
