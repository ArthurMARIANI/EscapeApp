import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/internal/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader();

    return next.handle(request)
      .pipe(
        catchError(error => {
          console.log('Catched error : ', error);
          if (error.status === 401) {
            // this.router.navigate(['']);
          }
          return throwError(error);
        }),
        tap(res => {
          this.onSuccess(res);
          return next.handle(request);
        }),
        finalize(() => {
          this.onEnd();
          return next.handle(request);
        })
      );
  }

  private onSuccess(res): void {
    this.hideLoader();
  }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    // this.loaderService.show();
  }

  private hideLoader(): void {
    // this.loaderService.hide();
  }
}
