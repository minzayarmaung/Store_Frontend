import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { coerceStringArray } from '@angular/cdk/coercion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'store';
  
  constructor( private dialog: MatDialog){}

  
}
