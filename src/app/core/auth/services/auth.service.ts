import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { environment } from '../../../../environments/environment';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private jwtService = inject(JwtService);
  private router = inject(Router);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor() {}

  login(credentials: {
    identifier: string;
    password: string;
  }): Observable<User> {
    return this.http
      .post<User>(`${environment.TICKETS_API_URL}/auth/local`, credentials)
      .pipe(
        tap(response => this.setAuth(response))
      )
  }

  register(credentials: {
    username: string;
    email: string;
    password: string;
  }): Observable<User> {
    return this.http
      .post<User>(`${environment.TICKETS_API_URL}/auth/local/register`, credentials)
      .pipe(
        tap(response => this.setAuth(response))
      )
  }

  logout() {
    this.purgeAuth();
    this.router.navigate(['/auth']);
  }

  setAuth(user: User) {
    this.jwtService.saveToken(user.jwt);
    this.currentUserSubject.next(user);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Observable<User> {
    const jwt = this.jwtService.getToken();
    return this.http.get<any>(`${environment.TICKETS_API_URL}/users/me`)
      .pipe(
        tap((response: any) => this.setAuth({
          jwt,
          user: response,
        }))
      )
  }
}
