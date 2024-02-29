import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators , AbstractControl} from '@angular/forms';
import { InvoiceData } from '../invoice-data/invoicedata.module';
import { StockData } from '../stock-data/stockdata.module';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { saveAs } from 'file-saver';

(pdfMake as any).vsf = pdfFonts.pdfMake.vfs;

class ExtendInvoiceData extends InvoiceData{
  stocks : ExtendedStockData[] | undefined;
}
class ExtendedStockData{
  stockId?: number;
  name: string | undefined;
  price: number | undefined;
  quantity : number | undefined;
  status? : string;
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
      time: new FormControl('' , Validators.required),
      center: new FormControl('', Validators.required),
      stocks: new FormArray([])
    });
  }
  

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.service.getInvoiceDataById(id).subscribe((data: any) => { 
      const invoiceData = data as ExtendInvoiceData; // Type assertion :3
      this.form.patchValue({
        cashierName: invoiceData.cashierName,
        branch: invoiceData.branch,
        date: invoiceData.date,
        time: invoiceData.time,
        center: invoiceData.center
      });
  
      if (invoiceData.stocks) { // Now accessing stocks from the asserted type
        invoiceData.stocks.forEach((stock: ExtendedStockData) => { // Using ExtendedStockData for each stock
          // To only Show data which are not Soft Deleted YET :3
          if(stock.status !== 'inactive'){
          const stockGroup = new FormGroup({
            stockId : new FormControl(stock.stockId),
            name: new FormControl(stock.name, Validators.required),
            quantity: new FormControl(stock.quantity, Validators.required),
            price: new FormControl(stock.price, Validators.required),
          
          });
          (this.form.get('stocks') as FormArray).push(stockGroup);
        }
        });
      }
    });
  }
  

  get stocks(): FormArray {
    return this.form.get('stocks') as FormArray;
  }

  // Deleting Stocks
  removeStock(index: number){
    const stock = this.stocks.at(index);
    // Checking If the Rows got Data or Not :3
    if(stock.get('stockId')?.value){
      const stockId = stock.get('stockId')?.value;
      this.service.softDeleteStock(stockId).subscribe(() => {
        console.log(`Stock with ID ${stockId} soft-deleted Successfully..`)
      } , error => {
        console.error(" Error Soft-Deleting Stock :" , error);
      });
    } else {
      this.stocks.removeAt(index);
      console.log("Row with No Data Deleted Successfully....")
    }
  }

  // Generatin PDF
  generatePDF(){
      const ID = this.route.snapshot.params['id'];
      console.log("URL Parameters : " , ID);
      if(!ID){
        console.error("No ID Found in the URL");
        alert("No ID was FOUND !" )
        return;
      }
      this.service.getDatabyEachIDPDF(ID).subscribe(blob => {
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `invoice-${ID}.pdf`;
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);

        alert("PDF File Generated! Please check your Downloads.😊");
      }, error => {
        console.error("Error Generating PDF :", error);
      })

    }


  addRow(){
    const stockGroup = new FormGroup({
      stockId : new FormControl(''),
      name : new FormControl('', Validators.required),
      quantity : new FormControl('', Validators.required),
      price : new FormControl('' , Validators.required)
    });
    this.stocks.push(stockGroup)
  } 

  calculateAmount(stock: any): number {
    const quantity = Number(stock.quantity);
    const price = Number(stock.price);
    return quantity * price;
  }

  calculateTotal(): number {
    let total = 0;
    this.stocks.controls.forEach((stockFormGroup: AbstractControl) => {
      const quantity = stockFormGroup.get('quantity')?.value || 0;
      const price = stockFormGroup.get('price')?.value || 0;
      total += quantity * price;
    });
    return total;
  }

  update(): void {
    const id = this.route.snapshot.params['invoiceId'];
    const updateInvoiceData = this.form.value;
    const updatedStockData = this.stocks.value;

    console.log('Sending data:', updateInvoiceData);

    this.service.updateInvoiceAndStockData(id, updateInvoiceData , updatedStockData).subscribe(() => {

      console.log("Invoice and Stock Data Updated Successfully !");
      this.router.navigate(['/result']).then(() => {
        window.location.reload();
      });
    } , error => {
        console.error("Error Updating Data : " , error);
    });
  }
}
