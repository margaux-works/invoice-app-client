import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://invoice-app-back-end-a62bca7e4740.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Helper method to get headers with Authorization token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
  }

  // User registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // User login endpoint
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Get list of invoices
  public getAllInvoices(): Observable<any> {
    return this.http
      .get(apiUrl + 'invoices', { headers: this.getHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get a single invoice by ID
  public getInvoiceById(id: string): Observable<any> {
    return this.http
      .get(apiUrl + `invoices/${id}`, { headers: this.getHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Create a new invoice
  public createInvoice(invoiceData: any): Observable<any> {
    return this.http
      .post(apiUrl + 'invoices', invoiceData, { headers: this.getHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Update an existing invoice
  public updateInvoice(id: string, invoiceData: any): Observable<any> {
    return this.http
      .put(apiUrl + `invoices/${id}`, invoiceData, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public markInvoiceAsPaid(id: string): Observable<any> {
    return this.http
      .patch(
        apiUrl + `invoices/${id}/mark-as-paid`,
        {},
        { headers: this.getHeaders() }
      )
      .pipe(
        catchError((error) => {
          console.error(
            `Error marking invoice as paid:`,
            error.message || error
          );
          return throwError(
            () => new Error('Failed to mark invoice as paid; please try again.')
          );
        })
      );
  }

  // Delete an invoice
  public deleteInvoice(id: string): Observable<any> {
    return this.http
      .delete(apiUrl + `invoices/${id}`, {
        headers: this.getHeaders(),
        responseType: 'text',
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status: ${error.status}, ` +
          `Error Body: ${JSON.stringify(error.error)}`
      );
    }
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }

  // Extract response data
  private extractResponseData(res: any): any {
    return res || {};
  }
}
