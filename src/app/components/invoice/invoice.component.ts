import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service'; // Assuming this is correctly imported
import { InvoiceData } from '../invoice-data/invoicedata.module'; // Assuming this is correctly imported

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  // Stock Form
  stockForm!: FormGroup;
  totalAmount = 0;

  // To decrease quantity by 1 when we click 1 
  decreaseQuantity(stock: any) {
    if (stock.quantity > 0) {
      stock.quantity--;
    }
  }

  // To increase quantity by 1 when we click 1
  increaseQuantity(stock: any) {
    stock.quantity++;
  }

  // Saving Invoice Data 
  constructor(private service: DataService, private router: Router, private fb: FormBuilder) { }

  data: any;

  form = new FormGroup({
    invoiceId: new FormControl('', Validators.required),
    cashierName: new FormControl('', Validators.required),
    branch: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    center: new FormControl('', Validators.required)
  });

  // Stock Functions Start

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      items: this.fb.array([this.createItem()])
    });

    this.stockForm.valueChanges.subscribe(value => {
      this.totalAmount = value.items.reduce((total: number, item: any) => total + (item.quantity * item.price), 0);
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      stockId: ['', Validators.required], 
      name: ['', Validators.required], 
      price: ['', Validators.required], 
      quantity: [, Validators.required], 

      invoice_Id:  ['', Validators.required], // Assuming this is the invoiceId
        // Add other properties of the invoice if necessary
      });
  }
  

  addItem(): void {
    this.items.push(this.createItem());
  }

  deleteItem(index: number): void {
    this.items.removeAt(index);
  }

  get items(): FormArray {
    return this.stockForm.get('items') as FormArray;
  }

  // Stock Functions End

  saveInvoice(): void {
    console.log(this.stockForm.value);
    this.service.addInvoiceData(this.stockForm.value).subscribe(data => {
      console.log(data);
    });
  }

  saveData(): void {
    // Saving Invoice Details form Data
    this.data = this.form.value;
    console.log(this.data);

    this.service.addInvoiceData(this.data).subscribe(data => {
      console.log(data);
    });

    // Saving Stock Details from Data
    const stockData = this.stockForm.value;
    console.log(stockData);
    this.service.addStockData(stockData).subscribe(data => {
      console.log(data);
    });

    // this.router.navigate(['/result']).then(() =>{
    //   window.location.reload();
    // });
  }
}
