import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { InvoiceData } from '../invoice-data/invoicedata.module';
import { StockData } from '../stock-data/stockdata.module';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent {
  availableInvoiceIds: number[] = [];
  stockForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service : DataService,
    private dialogRef: MatDialogRef<AddStockComponent>

  ) 
  
  {

    this.stockForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      invoiceId: ['', Validators.required],
      cashierName: [''], 
      branch: ['']
    });
  }

  ngOnInit(): void {
    this.service.getAvailableInvoiceIds().subscribe(ids => {
      this.availableInvoiceIds = ids;
    })
  } 

  // Saving Stock Data
  saveStockData(): void {
    this.service.getInvoiceDataById(this.stockForm.value.invoiceId).subscribe((invoiceData: any) => {
      const formData: StockData = { ...this.stockForm.value, invoice: invoiceData };
      console.log('Form Data:', formData); // Log the data being sent to the backend
  
      this.service.addStockData([formData]).subscribe(
        data => {
          console.log('Response from backend:', data); // Log the response from the backend
          console.log('Form Data:', this.stockForm.value); // Log the form data
        },
        error => {
          console.error('Error occurred:', error); // Log any errors that occur during the HTTP request
        }
      );
    });
  }
  // Saving Stock Data End
  
  
  // Dynamic Invoic Id Function
  onInvoiceSelectionChange(invoiceId: number): void{
    this.service.getInvoiceDataById(invoiceId).subscribe((InvoiceData: any)=> {
      if(InvoiceData){
        this.stockForm.patchValue({
          cashierName: InvoiceData.cashierName,
          branch: InvoiceData.branch
        })
      }
    })
  }

  // Dynamic Invoic Id Function End


}
