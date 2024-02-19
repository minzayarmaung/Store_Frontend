import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service'; 
import { InvoiceData } from '../invoice-data/invoicedata.module'; 
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStockComponent } from '../add-stock/add-stock.component';

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

  constructor(private service: DataService, private router: Router,
     private fb: FormBuilder , private renderer : Renderer2 , private el : ElementRef ,private dialog: MatDialog) { }

    // Getting All Data from the Stock Database to the Stock Table
  
  getStockData(): void {

    this.service.getStockData().subscribe(
       (data: any) => {
         this.stocks = data;  
       },
       (error: any) => {
         console.error("Error Getting the Data From the Database : ", error);
       }
     );
  }

     openDialog():void{
      const  dialogRef = this.dialog.open(AddStockComponent ,{
          width: '750px',
      });
      
      dialogRef.afterClosed().subscribe((result)=>{
        console.log("The Dialog is Closed ");
        console.log(result);
      })
  
    }
  

  data: any;

  form = new FormGroup({
    invoiceId: new FormControl('', Validators.required),
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

    this.getStockData();

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

  saveData(): void {
    // Showing Window to Make Sure 
    let confirmSave = window.confirm("Are you sure you want to Save this data?")

    if(confirmSave){
        // Saving Invoice Details to Data
        this.data = this.form.value;

        // Check if 'items' property exists in this.data
        if ('items' in this.data) {
            // Set the amount for each item
            this.data.items.forEach((item: any) => {
                item.amount = item.quantity * item.price;
            });
        }

        console.log(this.data);

        this.service.addInvoiceData(this.data).subscribe(data => {
            console.log(this.stockForm);
        });  
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

  // this.router.navigate(['/result']).then(() =>{
    //   window.location.reload();
    // });
}
