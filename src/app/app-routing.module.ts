import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home/home-component.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ResultComponent } from './components/result/result.component';
import { UpdateInvoiceComponent } from './components/update-invoice/update-invoice.component';


const routes: Routes = [
  { path : '' , component: InvoiceComponent},
  { path : 'result' , component: ResultComponent},
  { path : 'updateInvoice/:id' , component: UpdateInvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
