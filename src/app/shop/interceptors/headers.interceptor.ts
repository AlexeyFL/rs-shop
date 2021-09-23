import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      return next.handle(
        req.clone({
          setHeaders: {
            AuthenticationToken: localStorage.getItem('token') || '',
          },
        }),
      );
    }

    return next.handle(req);
  }
}
