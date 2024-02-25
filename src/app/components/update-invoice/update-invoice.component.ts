import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { InvoiceData } from '../invoice-data/invoicedata.module';
import { StockData } from '../stock-data/stockdata.module';

class ExtendInvoiceData extends InvoiceData{
  stocks : ExtendedStockData[] | undefined;
}
class ExtendedStockData{
  name: string | undefined;
  price: number | undefined;
  quantity : number | undefined;
}

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css']
})
export class UpdateInvoiceComponent implements OnInit {
  form: FormGroup;

  constructor(private service: DataService, private route: ActivatedRoute, private router: Router) {
    this.form = new FormGroup({
      cashierName: new FormControl('', Validators.required),
      branch: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      center: new FormControl('', Validators.required),
      stocks: new FormArray([])
    });
  }


  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.service.getInvoiceDataById(id).subscribe((data: any) => { // Use any if you're unsure about the data structure
      const invoiceData = data as ExtendInvoiceData; // Type assertion
      this.form.patchValue({
        cashierName: invoiceData.cashierName,
        branch: invoiceData.branch,
        date: invoiceData.date,
        time: invoiceData.time,
        center: invoiceData.center
      });
  
      if (invoiceData.stocks) { // Now accessing stocks from the asserted type
        invoiceData.stocks.forEach((stock: ExtendedStockData) => { // Using ExtendedStockData for each stock
          const stockGroup = new FormGroup({
            name: new FormControl(stock.name, Validators.required),
            quantity: new FormControl(stock.quantity, Validators.required),
            price: new FormControl(stock.price, Validators.required),
            // Ensure other fields are handled appropriately
          });
          (this.form.get('stocks') as FormArray).push(stockGroup);
        });
      }
    });
  }
  

  get stocks(): FormArray {
    return this.form.get('stocks') as FormArray;
  }

  update(): void {
    const id = this.route.snapshot.params['id'];
    const updateInvoiceData = this.form.value;
    const updatedStockData = this.stocks.value;

    console.log('Sending data:', updateInvoiceData, updatedStockData);

    this.service.updateInvoiceAndStockData(id, updateInvoiceData, updatedStockData).subscribe(() => {

      console.log("Invoice and Stock Data Updated Successfully !");
      // this.router.navigate(['/result']).then(() => {
      //   window.location.reload();
      // });
    } , error => {
        console.error("Error Updating Data : " , error);
    });
  }
}
