import { Injectable } from '@angular/core';
import { Gate } from './gate';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GateApi {

  constructor(private http: HttpClient, public authService: AuthService) { }

  getItems(): Observable<Array<Gate>> {
    return this.http.get<Array<Gate>>('/api/gates', this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getItem(id) {
    return this.http.get<Gate>(`/api/gates/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  saveItem(data) {
    return this.http.put(`/api/gates/${data.id}`, data, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  createItem(data) {
    return this.http.post<Gate>('/api/gates', data, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteItem(id) {
    return this.http.delete<Gate>(`/api/gates/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getModBusStatus(id) {
    if (!id) {
      return null;
    }
    return this.http.get(`/api/gates/control/modbusstatus/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  openGate(id) {
    return this.http.get(`/api/gates/control/opengate/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  closeGate(id) {
    return this.http.get(`/api/gates/control/closegate/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  simCarOnSensor(id) {
    return this.http.get(`/api/gates/control/simcaron/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  simCarOffSensor(id) {
    return this.http.get(`/api/gates/control/simcaroff/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }




  approve(id) {
    return this.http.get(`/api/gates/control/approve/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deny(id) {
    return this.http.get(`/api/gates/control/deny/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  denyAndBlacklist(id) {
    return this.http.get(`/api/gates/control/denyandblacklist/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  override(id) {
    return this.http.get(`/api/gates/control/override/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getCurrentEvents() {
    return this.http.get<Array<any>>(`/api/gates/control/getcurrentevents`, this.authService.getAuthHeaders())
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
