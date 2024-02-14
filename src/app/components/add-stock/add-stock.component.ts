import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent {
  stockForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service : DataService,
    private dialogRef: MatDialogRef<AddStockComponent>

  ) {
    this.stockForm = this.fb.group({
      stockId: ['', Validators.required],
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      invoice: this.fb.group({
        invoiceId: ['', Validators.required],
      }),
    });
  }

  saveStockData(): void {
    const formData = this.stockForm.value;
    console.log(formData);
  
    this.service.addStockData(formData).subscribe(data => {
      console.log(data);

      {{this.stockForm.value  }}
    });
  }
  


}
