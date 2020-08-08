import { Permissions } from './permissions';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/shared/modules/data-service/auth.service';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionsApi {

  constructor(private authService: AuthService, private http: HttpClient) { }

  getItems(): Observable<Array<Permissions>> {
    return this.http.get<Array<Permissions>>('/api/permissions', this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getItem(id) {
    return this.http.get<Permissions>(`/api/permissions/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  saveItem(data) {
    return this.http.put(`/api/permissions/${data.id}`, data, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  createItem(data) {
    return this.http.post<Permissions>('/api/permissions', data, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteItem(id) {
    return this.http.delete<Permissions>(`/api/permissions/${id}`, this.authService.getAuthHeaders())
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
      errorMessage = error.error ? error.error : error.message;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
