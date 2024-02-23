import { NgModule } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class InvoiceData { 
    invoiceId?:any;
    cashierName?:string;
    branch?:string;
    date?:string;
    time?:string;
    center?:string;
  }
  
