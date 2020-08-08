import { UserApi } from './UserApi.service';
import { User } from './User';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token = '';
  public user: User;

  constructor(private http: HttpClient) { }



  getToken() {
    if (this.token) {
      return this.token;
    } else {
      this.token = localStorage.getItem('gatecontrol');
      return this.token;
    }
  }

  setToken(token, rememberMe) {
    if (rememberMe) {
      localStorage.setItem('gatecontrol', token);
    }
    this.token = token;

  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('gatecontrol');
  }

  async checkToken() {

    if (!this.getToken()) {
      return false;
    }

    if (!this.user) {

    }
  }

  setUser(user) {
    this.user = user;
  }

  isAuthenticated(): Boolean {
    // check if we have a token saved

    if (this.token) {
      return true;
    }

    return false;
  }


  getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.token}`
      })
    };
  }



  login(username, password) {
    return this.http.post<{ token: string, user: User }>('http://192.168.99.100:3001/auth/login', { email: username, password: password })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  async logout() {
    this.clearToken();
    // delete the user token
    console.log('logout');

  }


  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.error ? error.error : error.message;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
