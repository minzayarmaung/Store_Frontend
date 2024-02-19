import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.css']
})
export class ViewStockComponent {

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


  ngOnInit(): void {
      this.getStockData();
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
// End of Delete Stock Data

// Edit Stock Data
editStockData(stockId : number){

}
// End of Edit Stock Data

// Pagination
p:number = 1;
itemsPerPage:number = 5 
totalRows:any;



filterChange: string = ""; // Responsible for Searching Data and Filtering Data
}
