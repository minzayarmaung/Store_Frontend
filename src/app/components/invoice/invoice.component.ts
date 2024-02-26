import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service'; 
import { InvoiceData } from '../invoice-data/invoicedata.module'; 
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStockComponent } from '../add-stock/add-stock.component';
import { StockData } from '../stock-data/stockdata.module';
import { DatePipe } from '@angular/common';
import { Time } from '@angular/common';

// Validation to Check
function invoiceIDValidator(control: AbstractControl) : ValidationErrors | null{
  const value = control.value;

  if(isNaN(value)){
    return { 'notANumber' : true};
  }

  return null;
}


interface Invoice {
  invoiceId: any;
  cashierName: string;
  branch: string;
  date: string;
  time: string; // Define time as string
  center: string;
  status: string;
}
interface StockDetails {
  name: string;
  quantity: number;
  price: number;
  // Add any other properties if necessary
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  @ViewChild('tbody') tbody!: ElementRef;

  // Stock Form
  stocks: any[] = [];
 // stockData: stock[] | undefined;
  stockForm!: FormGroup;
  totalAmount = 0;

  availableStockIds: any[] = [];

  constructor(private service: DataService, private router: Router,
     private fb: FormBuilder , private renderer : Renderer2 , private el : ElementRef ,private dialog: MatDialog,
     private cdr: ChangeDetectorRef) { }
  

  data: any;

  form = new FormGroup({
    invoiceId: new FormControl('', [Validators.required , invoiceIDValidator]),
    cashierName: new FormControl('', Validators.required),
    branch: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    center: new FormControl('', Validators.required),
    status : new FormControl('')
  });

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      items: this.fb.array([this.createItem()])
    });

    this.stockForm.valueChanges.subscribe(value => {
      this.totalAmount = value.items.reduce((total: number, item: any) => total + (item.quantity * item.price));
    });

    this.service.getAvailableStockIds().subscribe(ids => {
      this.availableStockIds = ids;
    })

  }

  createItem(): FormGroup {
    return this.fb.group({
      stockId: ['', Validators.required], 
      name: ['', Validators.required], 
      price: ['', Validators.required], 
      quantity: ['', Validators.required], 
      invoiceId: ['', Validators.required],
      amount : this.fb.control({value: '', disabled: false})
    });
  }

  // Populated Stock Info
  populateStockInfo(selectedValue: any, stock: any): void {
    const selectedStock = this.stocks.find((s: any) => s.stock_id == selectedValue);
    if (selectedStock && stock) {
      stock.name = selectedStock.name;
      stock.quantity = selectedStock.quantity;
      stock.price = selectedStock.price;
    }
  }

  onChange(event: Event, stock: any): void {
    const selectedValue: number = parseInt((event.target as HTMLSelectElement)?.value);
    if (!isNaN(selectedValue)) {
      this.service.getStockDataById(selectedValue).subscribe((stockData: StockData) => {
        if (stockData && stock) {
          stock.name = stockData.name;
          stock.quantity = stockData.quantity;
          stock.price = stockData.price;
        }
      });
    }
  }

  // Dynamic Row Adding 

    addRow(){
      this.stocks.push({ description : '', quantity : 1 , price: 1})
    }

    removeRow(index: number){
      this.stocks.splice(index, 1);
    }

    calculateAmount(stock: any): number {
      return stock.quantity * stock.price;
    }
    
    
    calculateTotal(): number {
      let total = 0;
      for (let stock of this.stocks) {
        total += this.calculateAmount(stock);
      }
      return total;
    }
    
  // Dynamic Row Adding 

 // Saving Data 

 saveData(): void {
  let confirmSave = window.confirm("Are you sure you want to Save this data?");
  
  if (confirmSave) {
    const manualInvoiceId = 25;
    const invoice: Invoice = {
      invoiceId: this.form.value.invoiceId,
      cashierName: this.form.value.cashierName || '',
      branch: this.form.value.branch || '',
      date: this.form.value.date || '',
      time: this.form.value.time || '',
      center: this.form.value.center || '',
      status: 'active' 
    };

    const stocks = this.stocks.map((stock: any) => ({
      ...stock,
      invoiceId: this.form.value.invoiceId,
      amount: stock.quantity * stock.price,
    }));

    console.log("Invoice Data :", invoice);
    console.log("Stock Data : ", stocks);

    const dataToSend = {
      invoiceId: manualInvoiceId,
      invoice: invoice,
      stocks: stocks
    };

    this.service.addInvoiceAndStockData(invoice , stocks).subscribe(response => {
      console.log(response);
      window.location.reload();
    }, error => {
      console.error("Error Saving invoice and stock data :", error);
    })
  } 
}




// Delete Stock Row

deleteStockRow(stockId: number): void {
  this.service.deleteStockData(stockId).subscribe(
    (data) => {
      // Filter out the deleted stock from the stocks array
      this.stocks = this.stocks.filter(stock => stock.stockId !== stockId);
    },
    (error) => {
      console.error("Error deleting stock row:", error);
    }
  );

  setTimeout(()=>{
    window.location.reload();
  } , 100);
}

// Pagination
p:number = 1;
itemsPerPage:number = 5 
totalRows:any;

changeItemsPerPage(event: any) {
  const target = event.target as HTMLSelectElement;
  const value = target.value;
  this.itemsPerPage = parseInt(value) || 5;
}

}
