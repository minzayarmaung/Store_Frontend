import { Component } from '@angular/core';
import { InvoiceData } from '../invoice-data/invoicedata.module';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StockData } from '../stock-data/stockdata.module';

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css']
})
export class UpdateInvoiceComponent {
  
    stockdata? : StockData
    invoicedata?: InvoiceData
    data: any;


    constructor(private service: DataService , private route: ActivatedRoute , private router : Router){}

   // Filling Data

    stockForm = new FormGroup({
      stockName: new FormControl('', Validators.required),
      quantity : new FormControl('', [Validators.required, Validators.min(1)]),
      price : new FormControl('', [Validators.required, Validators.min(1)])
    });


    form = new FormGroup({
      cashierName: new FormControl('', Validators.required),
      branch: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      center: new FormControl('', Validators.required)
    });

    ngOnInit(): void {
      let id = this.route.snapshot.params['id'];
      this.service.getInvoiceDataById(id).subscribe(data =>{
        this.invoicedata = data
        console.log(this.invoicedata)

        
        // Getting the current data with provided Id
        this.form.patchValue({
          cashierName: this.invoicedata.cashierName,
          branch: this.invoicedata.branch,
          center: this.invoicedata.center
        });
      });
      
    }

    update(): void{
      let id = this.route.snapshot.params['id'];
      const updateInvoiceData = this.form.value;

      this.service.updateInvoiceData(id , updateInvoiceData).subscribe(()=>{
        console.log("Invoice Data Updated Successfully !");

        this.router.navigate(['/result']).then(() => {
          window.location.reload();
        })
      })
    }
    
    
}
