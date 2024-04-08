declare var localStorage: Storage;
import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

import { Inject, inject } from '@angular/core';
import { Router } from '@angular/router';




export const addTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const token = localStorage.getItem('token');
  const _errorService = inject(ErrorService)
  const _router = inject(Router)
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
  }


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {
        _errorService.mssgError(error)
        _router.navigate(['/login'])
      }
      return throwError(() => error)
    }

    )
  );
};
