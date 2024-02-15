import { Component } from '@angular/core';
import { InvoiceData } from '../invoice-data/invoicedata.module';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css']
})
export class UpdateInvoiceComponent {
  
    invoicedata?: InvoiceData
    data: any;

    constructor(private service: DataService , private route: ActivatedRoute , private router : Router){}

    ngOnInit(): void {
      let id = this.route.snapshot.params['id'];
      this.service.getInvoiceDataById(id).subscribe(data =>{
        this.invoicedata = data
        console.log(this.invoicedata)
        
      })
      
    }

    form = new FormGroup({
      cashierName: new FormControl('', Validators.required),
      branch: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      center: new FormControl('', Validators.required)
    });

    // Filling Data



    update(){
      this.data = this.form.value
      console.log(this.data)

      this.service.updateInvoiceData(this.invoicedata?.invoiceId, this.data).subscribe(data => {
        console.log(data)
        
      })

      this.router.navigate(['/'])
    }
    
}
