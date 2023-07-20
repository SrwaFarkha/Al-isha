import { Injectable } from "@angular/core";
import { environment } from "src/environments/environments";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { Router } from "@angular/router";


@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private router: Router) {}

  /** Api call to external sources
   *  Disabling CORS check
   */
  getExternal(path: string): Observable<any> {
    const data$ = new Observable((observer) => {
      fetch(path)
        .then((response) => response.json()) // or text() or blob() etc.
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });

    return data$;
  }

  get(path: string, params: HttpParams = new HttpParams(), internalCall = true): Observable<any> {
    const url = internalCall ? `${environment.APIBasePath}` : "";
    return this.http.get<any>(`${url}${path}`, { params }).pipe();
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${environment.APIBasePath}${path}`, JSON.stringify(body)).pipe();
  }

  post(path: string, body: Object = {}, options: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.APIBasePath}${path}`, JSON.stringify(body), options)
      .pipe();
  }

  delete(path:any): Observable<any> {
    return this.http.delete(`${environment.APIBasePath}${path}`).pipe();
  }


}