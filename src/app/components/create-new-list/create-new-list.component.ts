import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TodosService } from "../../../services/todos.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { List } from "../../Models/List"
import { Task } from '../../Models/Task'
@Component({
  selector: 'app-create-new-list',
  templateUrl: './create-new-list.component.html',
  styleUrls: ['./create-new-list.component.css']
})
export class CreateNewListComponent implements OnInit {
  
  selectedListNum:number=-1;
  lists:List[];
  tasks:Task[];
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

  onListClick(listId:number){
    this.selectedList=this.lists[listId]
    this.selectedListNum = listId
    const selectedListId = this.selectedList.id
    this.listsService.getTasks(selectedListId).subscribe((tasks:[])=>this.tasks=tasks)
  }

  onAddList(){
    const list = {
      title:this.createANewListForm.value.listTitle,
      id:uuidv4(),
      numberOfAllTasks: 0,
      numberOfCompletedTasks: 0
    }
    this.listsService.addANewList(list).subscribe(() => this.listsService.getLists().subscribe(lists=> {
      this.lists=lists
    }))
    this.createANewListForm.setValue({listTitle:''})
  }

  onDeleteAList(id:string){
    const myObserver = {
      next: () => this.listsService.getLists().subscribe(lists=> {
        this.lists=lists
      }),
      error: (err:string) => console.error('Observer got an error: ' + err),
      complete:() => this.listsService.getLists().subscribe(lists=> {
        this.lists=lists
      }),
    };
    this.listsService.deleteAList(id).subscribe(myObserver)
  }
}