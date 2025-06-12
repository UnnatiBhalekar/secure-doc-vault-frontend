import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map }   from 'rxjs/operators';
import { Observable }  from 'rxjs';

interface AuthResponse { token: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  // signup(username: string, password: string): Observable<boolean> {
  //   return this.http
  //     .post<AuthResponse>(`${this.apiUrl}/signup`, { username, password })
  //     .pipe(
  //       tap(res => localStorage.setItem(this.tokenKey, res.token)),
  //       map(() => true)
  //     );
  // }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(res => localStorage.setItem(this.tokenKey, res.token)),
        map(() => true)
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
