import { Events } from './events';
import { Injectable } from '@angular/core';
import { Gate } from './gate';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventApi {

  constructor(private http: HttpClient, public authService: AuthService) { }

  getItems(): Observable<Array<Events>> {
    return this.http.get<Array<Events>>('http://localhost:3001/api/events', this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  printShortPDF(selectedEvents: Events[], eventsFrom: Date, eventsTo: Date, totalOfEvents: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${this.authService.getToken()}`
    });

    const printingUser = this.authService.user.firstname;
    let body = {arra: selectedEvents, token:this.authService.getToken(), eventsFrom, eventsTo, printingUser, totalOfEvents}
    return this.http.post<any>('http://localhost:3001/api/generatepdf?format=simple', body, {headers})
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  printDetailedPDF(selectedEvents: Events[], eventsFrom: Date, eventsTo: Date, totalOfEvents: number) {
    

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${this.authService.getToken()}`
    });

    const printingUser = this.authService.user.firstname;
    let body = {arra: selectedEvents, token:this.authService.getToken(), eventsFrom, eventsTo, printingUser, totalOfEvents}
    return this.http.post<any>('http://localhost:3001/api/generatepdf?format=detailed', body, {headers})
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  downloadReport(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${this.authService.getToken()}`,
      responseType: 'blob'
    });
   

    this.http.get('http:/localhost:3001/api/generatepdf',{
      responseType: 'arraybuffer',headers:headers} 
     ).subscribe(response => this.downLoadFile(response, "application/pdf"));
    
  }

  


/**
* Method is use to download file.
* @param data - Array Buffer data
* @param type - type of the document.
*/
downLoadFile(data: any, type: string) {
  let blob = new Blob([data], { type: type});
  let url = window.URL.createObjectURL(blob);
  const objectUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
					document.body.appendChild(a);
					a.setAttribute('style', 'display: none');
					a.href = objectUrl;
					a.download = 'result.pdf';
					a.click();
					window.URL.revokeObjectURL(objectUrl);
					a.remove(); // remove the element
}

  getItem(id) {
    return this.http.get<Events>(`/api/events/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  deleteItem(id) {
    return this.http.delete<Events>(`/api/events/${id}`, this.authService.getAuthHeaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  downloadVideo(recId) {
    return this.http.get(`/api/video/download/${recId}`, this.authService.getAuthHeaders())
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
