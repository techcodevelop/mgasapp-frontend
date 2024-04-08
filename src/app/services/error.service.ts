import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private toastSvc = inject(ToastrService)
  constructor() { }

  mssgError(e: HttpErrorResponse){
    if (e.error.msg) {
      this.toastSvc.error(e.error.msg, 'error')
    } else this.toastSvc.error('Ocurriò un error comuniquese con tu papi', 'error')
  }
}
