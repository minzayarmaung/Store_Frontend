// result.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

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

  filterChange: string = ""; // Responsible for Searching Data and Filtering Data
}
