import { Component } from '@angular/core';
import { StockData } from '../stock-data/stockdata.module';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent {

  stockdata? : StockData
  data: any;

  constructor(private service: DataService , private route: ActivatedRoute , private router : Router , 
    private fb: FormBuilder){}
  
  stockForm = new FormGroup({
    name: new FormControl('', Validators.required),
    quantity : new FormControl('', [Validators.required, Validators.min(1)]),
    price : new FormControl('', [Validators.required, Validators.min(1)])
  });

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.service.getStockDataById(id).subscribe(data=>{
      this.stockdata = data;
      console.log(this.stockdata)

      this.stockForm.patchValue({
        name: this.stockdata.name,
        quantity: this.stockdata.quantity?.toString(),
        price: this.stockdata.price,

      });
    });
    
  }


  update(){

    const updatedStockData = this.stockForm.value;
    console.log(this.data)

    //updatedStockData.invoiceId = this.stockdata?.invoiceId;

    this.service.updateStockData(this.stockdata?.stockId, updatedStockData).subscribe(() => {
      console.log('Stock Data Updated Successfully !' , updatedStockData);
    }, (error) => {
      console.error('Error Updating Stock Data : ', error);
    });

    this.router.navigate(['/result']).then(() => {
      window.location.reload();
    })
    
  }

}
