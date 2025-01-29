import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environments';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * GET request
   * @param path API endpoint
   * @param params Optional query parameters
   * @param internalCall Whether the call is internal (true by default)
   * @param handleError Whether to handle errors (true by default)
   * @returns An Observable emitting the API response
   */
  get(
    path: string, 
    params: HttpParams = new HttpParams(), 
    internalCall = true, 
    handleError = true
  ): Observable<any> {
    const url = internalCall ? `${environment.APIBasePath}${path}` : path;
    return this.http
      .get<any>(url, { params })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          if (handleError) {
            console.error('An error occurred:', error);
            alert('Failed to retrieve the item. Please try again.');
          }
          return throwError(() => error);
        })
      );
  }


  /**
   * PUT request
   * @param path API endpoint
   * @param body Request payload
   * @param handleError Whether to handle errors (true by default)
   * @returns An Observable emitting the processed API response
   */
  put(path: string, body: Object = {}, handleError = true): Observable<any> {
    return this.http
      .put(`${environment.APIBasePath}${path}`, body, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          if (handleError) {
            console.error('An error occurred:', error);
            alert('Failed to update the item. Please try again.');
          }
          return throwError(() => error);
        })
      );
  }


  /**
   * POST request
   * @param path API endpoint
   * @param body Request payload
   * @param options Additional request options (headers, etc.)
   * @param handleError Whether to handle errors (true by default)
   * @returns An Observable emitting the processed API response
   */
  // post(path: string, body: Object = {}, options: Object = {}, handleError = true): Observable<any> {
  //   return this.http
  //     .post(`${environment.APIBasePath}${path}`, body, {
  //       ...options,
  //       headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //     })
  //     .pipe(map(response => {
  //        return response;
  //       }),
  //       catchError(error => {
  //         return error
  //       })
  //     );
  // }
  post(path: string, body: Object = {}, options: Object = {}, handleError = true): Observable<any> {
    return this.http
      .post(`${environment.APIBasePath}${path}`, body, {
        ...options,
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        map(response => response),
        catchError(error => {
          if (handleError) {
            // Rethrow the error to be handled in the calling code
            return throwError(() => error);
          }
          // Optionally handle the error here if needed
          return of(null);
        })
      );
  }
  


  /**
   * DELETE request
   * @param path API endpoint
   * @param handleError Whether to handle errors (true by default)
   * @returns An Observable emitting the API response
   */
  delete(path: string, handleError = true): Observable<any> {
    return this.http.delete(`${environment.APIBasePath}${path}`).pipe(
      tap(response => {
        console.log('DELETE Response:', response); 
      }),
      map(response => {
        return response;
      }),
      catchError(error => {
        if (handleError) {
          console.error('An error occurred:', error);
          alert('Failed to delete the item. Please try again.');
        }
        return throwError(() => error);
      })
    );
  }
}
