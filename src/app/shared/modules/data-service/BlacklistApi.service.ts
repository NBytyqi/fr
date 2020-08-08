import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Blacklist } from './blacklist';

@Injectable({
  providedIn: 'root'
})
export class BlacklistApi {

  constructor(private http: HttpClient, public authService: AuthService) { }

  getItems(): Observable<Array<Blacklist>> {
    return this.http.get<Array<Blacklist>>('/api/blacklist', this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getItem(id) {
    return this.http.get<Blacklist>(`/api/blacklist/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  saveItem(data) {
    return this.http.put(`/api/blacklist/${data.id}`, data, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  createItem(data) {
    return this.http.post<Blacklist>('/api/blacklist', data, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteItem(id) {
    return this.http.delete<Blacklist>(`/api/blacklist/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
