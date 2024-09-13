import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EMPTY } from 'rxjs';

import { routes } from './app.routes';
import { tokenInterceptor } from './core/auth/interceptors/token.interceptor';
import { AuthService } from './core/auth/services/auth.service';
import { JwtService } from './core/auth/services/jwt.service';

export function initAuth(jwtService: JwtService, authService: AuthService) {
  return () => {
    return jwtService.getToken() ? authService.getCurrentUser() : EMPTY;
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [JwtService, AuthService],
      multi: true,
    },
  ],
};
