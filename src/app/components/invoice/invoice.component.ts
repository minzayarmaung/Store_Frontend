import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
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

}
