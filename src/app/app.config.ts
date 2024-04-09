import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { addTokenInterceptor } from './utils/add-token.interceptor';



export const appConfig: ApplicationConfig = {
  providers:
    [ // provideHttpClient(withInterceptors([addTokenInterceptor])), 
      provideRouter(routes),
     provideHttpClient(),// para injecciones http
    
      provideClientHydration(),
      provideAnimations(),
      provideToastr({ timeOut: 3000, positionClass: 'toast-top-right', preventDuplicates: true })
    ]
};
