import { Component } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {

   // This is for setting the current quantiy to 0
   stock = { quantity : 0}

   // Then setting these values to the UI
   stocks = [
     {id: 1, name: 'Laptop', quantity: 10, price: 100},
     {id: 2, name: 'Keyboard', quantity: 20, price: 150},
     {id: 3, name: 'Mouse', quantity: 25, price: 150},
     {id: 4, name: 'Laptop bags', quantity: 15, price: 150},
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
