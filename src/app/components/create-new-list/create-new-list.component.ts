import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TodosService } from "../../../services/todos.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {List} from "../../Models/List"

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
  selectedList:List

  @Output() tasksList = new EventEmitter();

  createANewListForm = new FormGroup({
    listTitle: new FormControl('', [
      Validators.compose([Validators.minLength(1), Validators.required])
    ])
  }) 

  constructor(private listsService:TodosService) { }

  ngOnInit() {
    this.listsService.getLists().subscribe(lists => {
      this.lists = lists
    })
  }

  onListClick(listId){
    this.selectedList=this.lists[listId]
    this.selectedListNum = listId
    const selectedListId = this.selectedList.id
    const myObserver = {
      next: (tasks)=>this.tasks=tasks,
      error: err => console.error('Observer got an error: ' + err)
    };
    this.listsService.getTasks(selectedListId).subscribe(myObserver)
    
  }

  onAddList(){
    const list = {
      title:this.createANewListForm.value.listTitle,
      id:uuidv4(),
      numberOfAllTasks: 0,
      numberOfCompletedTasks: 0
    }
    const myObserver = {
      next: () => this.listsService.getLists().subscribe(lists=> {
        this.lists=lists
      }),
      error: err => console.error('Observer got an error: ' + err),
    };
    this.listsService.addANewList(list).subscribe(myObserver)
    this.createANewListForm.setValue({listTitle:''})
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