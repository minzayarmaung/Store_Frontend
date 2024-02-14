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

  export class StockData { 
    stockId?: number;
    invoiceId?: number;
    name?:string;
    price?:string;
    quantity?:BigInt;
    amount?:BigInt
  }
