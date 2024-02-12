// result.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import * as XLSX from 'xlsx';

interface User {
  // Define properties based on the structure of the user data
  id: number;
  name: string;
  // Add more properties as needed
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  users: User[] | undefined;
  url: string = "http://localhost:8080/";

  constructor(private service: DataService, private router: Router) {}

  ngOnInit(): void {
    this.service.getResultTable().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  /* Default Name for Excel file when Download */
  fileName = "ExcelSheetFile.xlsx";

  // Export to Excel File
  exportExcel(){

    /* Passing Table ID  */
    let data = document.getElementById("table-data");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)

    /* Generating workbook and add the worksheet */
    const wb : XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws, 'Sheet1')

    /* Saving to the File */
    XLSX.writeFile(wb, this.fileName)

  }

  // Import Excel File to the Table

  ExcelData: any;

  importExcel(e : any){
    
    const file = e.target.files[0];
    let fr = new FileReader();
    
    fr.readAsArrayBuffer(file);

    fr.onload = ()=>{

      let data = fr.result;
      let workbook = XLSX.read(data , {type: 'array'});

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName]
      
      this.ExcelData =  XLSX.utils.sheet_to_json(sheet , {raw: true})
      console.log(this.ExcelData)

    }
    
  }

  filterChange: string = ""; // Responsible for Searching Data and Filtering Data
}
