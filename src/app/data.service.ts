  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http'
  import { Observable } from 'rxjs';
  import { InvoiceData } from './components/invoice-data/invoicedata.module';
  import { ReactiveFormsModule } from '@angular/forms';

  @Injectable({
    providedIn: 'root'
  })
  export class DataService {

    private url = "http://localhost:8080/";

    constructor(private http: HttpClient) {

    }

    // Getting Datas - Reading
    getResultTable(): Observable<any[]>{
      return this.http.get<any[]>(this.url+'all_invoice_data')
    }

    // Adding Data to Invoice - Create
    addInvoiceData(user: InvoiceData): Observable<any> {
      return this.http.post(`${this.url}save/invoiceData`, user, { responseType: 'text' });
    }
  }    