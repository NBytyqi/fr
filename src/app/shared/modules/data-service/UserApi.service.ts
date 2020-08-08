import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/shared/modules/data-service/auth.service';
import { User } from './User';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserApi {

  constructor(public authService: AuthService, private http: HttpClient) { }

  getItems(): Observable<Array<User>> {
    return this.http.get<Array<User>>('/api/users', this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getItem(id = null) {
    return this.http.get<User>(`/api/users/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  saveItem(data) {
    return this.http.put(`/api/users/${data.id}`, data, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  createItem(data) {
    return this.http.post<User>('/api/users', data, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteItem(id) {
    return this.http.delete<User>(`/api/users/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  async register(userdata) {
    // create new user

  }





  async resetPassword(data) {

  }

  async getCurrentId() {

  }

  async getCurrent(): Promise<User> {

    return null;
  }

  async setPassword(value) {

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
