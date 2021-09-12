import {
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
    console.log('constructor');
  }

  ngAfterViewInit() {
    this.searchResults();
    console.log('ngAfterViewInit');
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
      .subscribe((data: string) => {
        console.log('searchResults', data);
        // this.dataBaseService.getCategoryByName(data);
        // this.dataBaseService.getGoodByName(data);
      });
  }

  clearSearch() {
    /* this.searchList.nativeElement.innerHTML = '';
    this.search.nativeElement.value = ''; */
    this.search.nativeElement.value = '';
    this.dataBaseService.getCategoryByName('');
    this.dataBaseService.getGoodByName('');
  }
}
