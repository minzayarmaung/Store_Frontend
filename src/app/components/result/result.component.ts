import { Component } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  users : any[] = []

  ngOnInit(): void {
    this.users = [
        
    ];
    
  }

  filterChange:string = "" // Responsible for Searching Data and Flitering Data
}
