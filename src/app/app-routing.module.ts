import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home/home-component.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { StockComponent } from './components/stock/stock.component';
import { ResultComponent } from './components/result/result.component';


const routes: Routes = [
  { path : '' , component: InvoiceComponent},
  { path : 'result' , component : ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
