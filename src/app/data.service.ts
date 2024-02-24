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
    addStockData(user: StockData[]):Observable<any>{
      return this.http.post(`${this.url}save/stockData` , user , { responseType: 'text'});
    }

    // Deleting Data from Stock Data Table
    deleteStockData(id : number):Observable<any>{
      return this.http.delete<any>(`${this.url}deleteStockData/${id}`)
    }

    // Invoice Soft Delete From Database 
    softDelete(id:number){
      return this.http.put(`${this.url}table/softDelete/${id}`, null , { responseType: 'text'});
    }

    // Stock Soft Delete From Database
    softDeleteStock(id:number){
      return this.http.put(`${this.url}stock/softDelete/${id}` , null , {responseType: 'text'});
    }

    // Getting Data from Stock Table
    getStockData(): Observable<any[]>{
      return this.http.get<any[]>(this.url+'view_stocks')
    }

    // Get Invoice Data By Id  - Reading 
    getInvoiceDataById(id: number): Observable<InvoiceData>{
      return this.http.get<InvoiceData>(`${this.url}invoice/${id}`)
    } 

    // Get Stock Data By Id - Reading
    getStockDataById(id: number): Observable<StockData>{
      return this.http.get<InvoiceData>(`${this.url}stock/${id}`)
    }

    // Updating Invoice Data from Result Table
    updateInvoiceData(id?:number , user?: any): Observable<any>{
      return this.http.put<any>(`${this.url}updateInvoice/${id}`, user)
    }

    // Updating Stock Data from Result Table
    updateStockData(id?:number , user?: any):Observable<any>{
      return this.http.put<any>(`${this.url}updateStock/${id}`, user)
    }

    // Get StockId and Stock Amount By invoiceId LEFT JOIN - Reading
     getInvoiceWithStockDetails(): Observable<any[]>{
      return this.http.get<any[]>(this.url+'invoice-with-stock-details')
    }

    // Getting Available Stocks
    getAvailableStockIds(): Observable<number[]>{
      return this.http.get<number[]>(`${this.url}stocks/getStockIds`)
    }

    // Getting Available Invoic Ids
    getAvailableInvoiceIds(): Observable<number[]>{
      return this.http.get<number[]>(`${this.url}invoice/getInvoiceIds`)
    }

    // Saving Both Invoice and Stock Data
    addInvoiceAndStockData(invoiceData: InvoiceData , stockData: StockData[]): Observable<any>{
      const data ={
        invoiceId : invoiceData.invoiceId,
        invoice : invoiceData,
        stocks : stockData
      }
      return this.http.post<any>(`${this.url}saveInvoiceAndStockData`, data , { responseType: 'text' as 'json'})
    }
  }