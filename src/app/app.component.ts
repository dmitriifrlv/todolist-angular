import { Component, OnInit } from '@angular/core';
import { TodosService } from "../services/todos.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor(private listsService:TodosService) { }

  ngOnInit() {

  } 
}
