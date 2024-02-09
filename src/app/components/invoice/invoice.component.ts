import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { InvoiceData } from '../invoice-data/invoicedata.module';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  invoiceData : InvoiceData = new InvoiceData();

   // This is for setting the current quantiy to 0
   stock = { quantity : 0}

   // Then setting these values to the UI
   stocks = [
     {id: 1, invoiceid: 1 , name: 'Laptop', quantity: 10, price: 100},
     {id: 2, invoiceid: 2 , name: 'Mouse', quantity: 10, price: 20},
     {id: 3, invoiceid: 3 , name: 'Keyboard', quantity: 10, price: 30},
     {id: 4, invoiceid: 4 , name: 'Charger', quantity: 10, price: 40}
   ]

   // This is the function for getting total values of the total amount
   get totalAmount(){
     return this.stocks.reduce((total, stock) => total + (stock.quantity * stock.price), 0);
   }


   // To decrease quantity by 1 when we click 1 
   decreaseQuantity(stock : any){
     if(stock.quantity > 0){
       stock.quantity--
     }
   }

   // To increase quantity by 1 when we click 1
   increaseQuantity(stock : any){
     stock.quantity++
   }

   // Saving Invoice Data 

   constructor(private service: DataService , private router: Router ){}

   data: any

   form = new FormGroup({
    invoiceId: new FormControl('', Validators.required),
    cashierName: new FormControl('', Validators.required),
    branch: new FormControl('', Validators.required),
    date : new FormControl('', Validators.required),
    time: new FormControl('' , Validators.required),
    center: new FormControl('' , Validators.required)
  })
  
  ngOnInit(): void {
    // Initialize form with default values if necessary
  }
  
  saveData(){
    this.data = this.form.value
    console.log(this.data)
  
    this.service.addInvoiceData(this.data).subscribe(data => {
      console.log(data)
    });

    this.router.navigate(['/result']).then(() =>{
      window.location.reload();
    });
    
  }
  

}
