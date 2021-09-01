import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.scss'],
})
export class UserLocationComponent implements OnInit, AfterViewInit {
  @ViewChild('searchCityInput') searchingInput?: ElementRef;

  cityListShow: boolean = false;

  userLocation: string = '';

  cities$: Observable<string[]>;

  cities$$ = new BehaviorSubject<string[]>([]);

  cities: string[] = [];

  constructor(public locationService: LocationService) {
    this.cities$ = this.cities$$.asObservable();
  }

  ngOnInit() {
    this.locationService.getCity();
    this.locationService.currentCity$
      ?.pipe(
        map((data) => {
          this.userLocation = data.city;
        }),
      )
      .subscribe();
  }

  ngAfterViewInit() {
    this.getSearchingCity();
  }

  getSearchingCity() {
    fromEvent(this.searchingInput?.nativeElement, 'input')
      .pipe(
        map((event: any) => (event.target as HTMLInputElement).value),
        debounceTime(1500),
        distinctUntilChanged(),
      )
      .subscribe((searchString) => {
        this.cities$$.next(this.locationService.filterCities(searchString));
      });
  }

  setCurrentCity(e: Event) {
    this.userLocation = (e.target as HTMLInputElement).innerText;
    this.cities$$.next([]);
  }

  onCityListShow() {
    this.cityListShow = !this.cityListShow;
  }

  onSaveCurrentCity() {
    this.cityListShow = false;
  }
}
