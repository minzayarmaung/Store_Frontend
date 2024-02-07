import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home/home-component.component';
import { InvoiceComponent } from './components/invoice/invoice.component';


const routes: Routes = [
  { path : '' , component: HomeComponentComponent},
  { path : '' , component: InvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
