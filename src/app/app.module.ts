import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './components/home/home-component.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { FilterpipePipe } from './filterpipe.pipe';
import { StockComponent } from './components/stock/stock.component';
import { ResultComponent } from './components/result/result.component';
import { HttpClientModule } from '@angular/common/http';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    // Other imports...
    MatSelectModule
  ],
  // Other module properties...
})
export class YourModule { }

import { MatInputModule } from '@angular/material/input';
import { UpdateInvoiceComponent } from './components/update-invoice/update-invoice.component';
import { ViewStockComponent } from './components/view-stock/view-stock.component';
import { AddNewStockComponent } from './components/add-new-stock/add-new-stock.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    InvoiceComponent,
    FilterpipePipe,
    StockComponent,
    ResultComponent,
    AddStockComponent,
    UpdateInvoiceComponent,
    ViewStockComponent,
    AddNewStockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    NgxPaginationModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
