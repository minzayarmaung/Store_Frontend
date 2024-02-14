  import { Injectable } from '@angular/core';
  import { HttpClient, HttpStatusCode } from '@angular/common/http'
  import { Observable } from 'rxjs';
  import { InvoiceData } from './components/invoice-data/invoicedata.module';
  import { ReactiveFormsModule } from '@angular/forms';
  import { StockData } from './components/stock-data/stockdata.module';

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

    // Adding Data to Stock - Create
    addStockData(user: StockData):Observable<any>{
      return this.http.post(`${this.url}save/stockData` , user , { responseType: 'text'});
    }

    // Deleting Data from Stock Data Table
    deleteStockData(id : number):Observable<any>{
      return this.http.delete<any>(`${this.url}deleteStockData/${id}`)
    }

    // Soft Delete From Database
    softDelete(id:number){
      return this.http.put(`${this.url}table/softDelete/${id}`, null , { responseType: 'text'});
    }

    // Getting Data from Stock Table
    getStockData(): Observable<any[]>{
      return this.http.get<any[]>(this.url+'all_stock_data')
    }

  }    