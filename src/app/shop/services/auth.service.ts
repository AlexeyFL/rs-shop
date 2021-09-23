import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { localUrl } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // token: string | undefined = '';
  loginError$!: Observable<string>;

  loginError$$ = new Subject<string>();

  constructor(private http: HttpClient) {
    this.loginError$ = this.loginError$$.asObservable();
  }

  loginUser(loginData = { login: 'string', password: 'string' }) {
    this.http
      .post(`${localUrl}/users/login`, loginData, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}` || '',
        ),
      })
      .pipe(
        map((data: any) => {
          if (data) {
            localStorage.setItem('token', data.token);
          }
        }),
      )
      .subscribe(
        () => {},
        (err) => {
          this.loginError$$.next(err.statusText);
        },
      );
  }

  registerUser(
    userData = {
      firstName: 'string',
      lastName: 'string',
      login: 'string',
      password: 'string',
    },
  ) {
    this.http
      .post(`${localUrl}/users/register`, userData)
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
