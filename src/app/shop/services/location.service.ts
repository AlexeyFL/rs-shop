/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { LocationResponse } from '../models/location-response';
import { cities } from '../../cities';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  cities = cities.slice();

  currentCity$: Observable<LocationResponse> | undefined;

  currentCity$$ = new Subject<LocationResponse>();

  constructor(private http: HttpClient) {
    this.currentCity$ = this.currentCity$$.asObservable();
  }

  getCity() {
    const success = (position: GeolocationPosition) => {
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      return this.http
        .get<LocationResponse>(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`,
        )
        .subscribe((data) => {
          this.currentCity$$.next(data);
        });
    };

    function error() {
      console.log('Unable to retrieve your location');
    }

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  getCities() {
    return this.cities;
  }

  filterCities(searchString: string) {
    if (searchString.length < 2) {
      return [];
    }
    return this.cities.filter(
      (city) => city.toLowerCase().indexOf(searchString.toLowerCase()) >= 0,
    );
  }
}
