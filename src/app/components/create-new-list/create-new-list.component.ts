import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-new-list',
  templateUrl: './create-new-list.component.html',
  styleUrls: ['./create-new-list.component.css']
})
export class CreateNewListComponent implements OnInit {
  enteredTitle:string|number = '';
  @Output() listCreated = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onAddList(){
    const list = {
      title:this.enteredTitle,
      listId:uuidv4(),
      tasks: []
    }
    this.listCreated.emit(list)
  }
}


let z =[{
  listId: 1,
  title: "chores", 
  tasks: [{
      id: 1,
      description: "cleaning",
      isCompleted: false
  },
  {
      id: 2,
      description: "washing",
      isCompleted: false
  }
  ]
}]