import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TodosService } from "../../../services/todos.service";

@Component({
  selector: 'app-create-new-list',
  templateUrl: './create-new-list.component.html',
  styleUrls: ['./create-new-list.component.css']
})
export class CreateNewListComponent implements OnInit {
  selectedListNum:number=-1;
  enteredTitle:string|number = '';
  lists:[]
  tasks
  list
  allTasks
  numberOfTasks:number;
  numberOfCompletedTasks:number
  @Output() tasksList = new EventEmitter();

  constructor(private listsService:TodosService) { }

  ngOnInit() {
    this.listsService.getLists().subscribe(lists => {
      this.lists = lists
    })
    const myObserver = {
      next: tasks=>this.allTasks=tasks,
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log(this.allTasks),
    };
    this.listsService.getAllTasks().subscribe(myObserver)
    console.log(this.lists, this.allTasks)
  }

  onListClick(listId){
    this.selectedListNum = listId
    const myObserver = {
      next: (tasks)=>this.tasks=tasks,
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log(this.tasks),
    };
    this.listsService.getTasks(listId).subscribe(myObserver)
  }

  onAddList(){
    const list = {
      title:this.enteredTitle,
      id:uuidv4(),
    }
    const myObserver = {
      next: () => this.listsService.getLists().subscribe(lists=> {
        this.lists=lists
      }),
      error: err => console.error('Observer got an error: ' + err),
    };
    this.listsService.addANewList(list).subscribe(myObserver)
  }

  onDeleteAList(id){
    const myObserver = {
      next: () => this.listsService.getLists().subscribe(lists=> {
        this.lists=lists
      }),
      error: err => console.error('Observer got an error: ' + err),
      complete:() => this.listsService.getLists().subscribe(lists=> {
        this.lists=lists
      }),
    };
    this.listsService.deleteAList(id).subscribe(myObserver)
  }
}