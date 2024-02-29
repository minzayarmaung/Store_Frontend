import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { coerceStringArray } from '@angular/cdk/coercion';
import { Router } from '@angular/router';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'store';
  
  constructor( private dialog: MatDialog, private router: Router){}

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }


  
}
