import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user.model';
import { environment } from '../../../../../../environments/environment';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private jwtService = inject(JwtService);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser = this.currentUserSubject.asObservable();

  constructor() {}

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

  setAuth(user: User) {
    this.jwtService.saveToken(user.jwt);
    this.currentUserSubject.next(user);
  }
}
