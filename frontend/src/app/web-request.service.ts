import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL: string;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000'; // replace with your API base URL
  }

  get<T>(uri: string): Observable<T> {
    return this.http.get<T>(`${this.ROOT_URL}/${uri}`).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(uri: string, payload: Object): Observable<T> {
    return this.http.post<T>(`${this.ROOT_URL}/${uri}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  patch<T>(uri: string, payload: Object): Observable<T> {
    return this.http.patch<T>(`${this.ROOT_URL}/${uri}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  delete(url: string): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}/${url}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
