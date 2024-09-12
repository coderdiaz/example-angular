import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  getToken(): string {
    return window.localStorage['jwt'];
  }

  saveToken(token: string) {
    window.localStorage['jwt'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwt');
  }
}
