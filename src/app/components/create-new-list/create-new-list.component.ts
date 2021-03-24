import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TodosService } from "../../../services/todos.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { List } from "../../Models/List"
import { Task } from '../../Models/Task'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-create-new-list',
  templateUrl: './create-new-list.component.html',
  styleUrls: ['./create-new-list.component.css']
})
export class CreateNewListComponent implements OnInit {
  addANewList: Subscription
  selectedListNum=-1;
  lists:List[];
  tasks:Task[];
  selectedList:List

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

  onListSelected(num:number){
    this.selectedListNum = num
  }
  
  onListClick(listId:number){
    this.selectedList=this.lists[listId]
    const selectedListId = this.selectedList.id
    const subscription = this.listsService.getTasks(selectedListId).subscribe((tasks:[])=>{
      this.tasks=tasks
      subscription.unsubscribe()
    })
  }

  onAddList(){
    const list = {
      title:this.createANewListForm.value.listTitle.trim(),
      id:uuidv4(),
      numberOfAllTasks: 0,
      numberOfCompletedTasks: 0
    }
    const myObserver = {
      next:() => this.listsService.getLists().subscribe(lists=> {
        this.lists=lists
      }),
      complete: ()=>subscription.unsubscribe()
    }
    const subscription = this.listsService.addANewList(list).subscribe(myObserver)
    this.createANewListForm.setValue({listTitle:''})
    this.createANewListForm.reset(this.createANewListForm.value)
  }

  onDeleteAList(id:string){
    const myObserver = {
      next: () => {this.selectedListNum=-1},
      error: (err:string) => console.error('Observer got an error: ' + err),
      complete:() => this.listsService.getLists().subscribe(lists=> {
        this.lists=lists
      }),
    };
    this.listsService.deleteAList(id).subscribe(myObserver)
  }
}