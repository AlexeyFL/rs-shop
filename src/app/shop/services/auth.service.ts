import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserToken } from '../models/response-models';
import { localUrl } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // token: string | undefined = '';

  constructor(private http: HttpClient) {}

  loginUser() {
    this.http
      .post(`${localUrl}/users/login`, {
        login: 'string',
        password: 'string',
      })
      .pipe(
        map((data: any) => {
          if (data) {
            localStorage.setItem('token', data.token);
          }
        }),
      )
      .subscribe();
  }

  registerUser() {
    this.http
      .post(`${localUrl}/users/register`, {
        firstName: 'string',
        lastName: 'string',
        login: 'string',
        password: 'string',
      })
      .pipe(
        map((data: any) => {
          if (data) {
            localStorage.setItem('token', data.token);
          }
        }),
      )
      .subscribe();
  }
}
