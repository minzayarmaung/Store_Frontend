import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home/home-component.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ResultComponent } from './components/result/result.component';
import { UpdateInvoiceComponent } from './components/update-invoice/update-invoice.component';
import { ViewStockComponent } from './components/view-stock/view-stock.component';
import { AppComponent } from './app.component';
import { UpdateStockComponent } from './components/update-stock/update-stock.component';


const routes: Routes = [
  { path : '' , component: InvoiceComponent},
  { path : 'result' , component: ResultComponent},
  { path : 'updateInvoice/:id' , component: UpdateInvoiceComponent},
  { path : 'view_stocks' , component: ViewStockComponent},
  { path : 'updateStock/:id' , component: UpdateStockComponent},
  { path : 'generatePDFById/:invoiceId', component: UpdateInvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
