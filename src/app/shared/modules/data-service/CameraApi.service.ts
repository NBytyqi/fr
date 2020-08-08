import { Camera } from './camera';
import { Injectable } from '@angular/core';
import { Gate } from './gate';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraApi {

  constructor(private http: HttpClient, public authService: AuthService) { }

  getItems(): Observable<Array<Camera>> {
    return this.http.get<Array<Camera>>('/api/cameras', this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getItem(id) {
    return this.http.get<Camera>(`/api/cameras/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  saveItem(data) {
    return this.http.put(`/api/cameras/${data.id}`, data, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  createItem(data) {
    return this.http.post<Camera>('/api/cameras', data, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteItem(id) {
    return this.http.delete<Camera>(`/api/cameras/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  scanOnvifCameras() {
    return this.http.get('/api/cameras/services/scanforonvifcameras', this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  installCamerasFromOnvifSearch(data) {
    return this.http.post<Array<Camera>>('/api/cameras/services/installCamerasFromOnvifSearch', data, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getLatestImage(id) {
    return this.http.get(`/api/cameras/services/getlatestimage/${id}`, this.authService.getAuthHeaders())
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
