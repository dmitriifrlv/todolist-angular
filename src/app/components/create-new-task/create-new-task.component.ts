import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TodosService } from "../../../services/todos.service";

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.css']
})
export class CreateNewTaskComponent implements OnInit {
  requiredLetters:string=''
  enteredTask:string|number = '';
  showAll:Boolean = true
  @Input()tasks
  @Input() selectedListNum:number
  @Input() lists

  @Output() taskCreated = new EventEmitter();
  
  constructor(private listsService:TodosService) { }

  ngOnInit() {
  }

  onAddTask(){
    console.log(this.enteredTask)
    const task = {
      description:this.enteredTask,
      id: uuidv4(),
      isCompleted: false,
      listsId:this.selectedListNum
    }
    const myObserver = {
      next:  ()=>this.listsService.getTasks(this.selectedListNum).subscribe((tasks)=>{
        if (this.showAll===true) {
          this.tasks=tasks.filter(x=>x.description.includes(this.requiredLetters))
        } else {
          this.tasks=tasks.filter(x=>x.isCompleted===false && x.description.includes(this.requiredLetters))
        }
      }),
      error: err => console.error('Observer got an error: ' + err),
    };
    this.listsService.addANewTask(task).subscribe(myObserver)
    this.enteredTask=''
  }

  onDeleteATask(id){
    console.log('hi')
    const myObserver = {
      next: ()=>this.listsService.getTasks(this.selectedListNum).subscribe((tasks)=>{
        if (this.showAll===true) {
          this.tasks=tasks.filter(x=>x.description.includes(this.requiredLetters))
        } else {
          this.tasks=tasks.filter(x=>x.isCompleted===false && x.description.includes(this.requiredLetters))
        }
      }),
      error: err => console.error('Observer got an error: ' + err)
    };
    this.listsService.deleteATask(id).subscribe(myObserver)
  }

  onUpdateATask(updatedTask) {
    const myObserver = {
      next: ()=> {if (this.showAll===false) {
        this.listsService.getTasks(this.selectedListNum).subscribe(tasks=>this.tasks=tasks.filter(x=>x.isCompleted===false))
      } else {
        console.log(this.showAll)
        this.listsService.getTasks(this.selectedListNum).subscribe(tasks=>this.tasks=tasks)
      }},
      error: err => console.error('Observer got an error: ' + err)
    };
    this.listsService.toggleCompleted(updatedTask.id,updatedTask).subscribe(myObserver)
  }

  uncompletedFilter(){
    this.showAll=false
    console.log(this.showAll)
    this.tasks=this.tasks.filter(x=>x.isCompleted===false && x.description.includes(this.requiredLetters)) 
  }

  showAllTasks(){
    this.showAll=true;
    console.log(this.showAll)
    const myObserver = {
      next: (tasks)=>{
        this.tasks = tasks.filter(x=>x.description.includes(this.requiredLetters))
      }}
    this.listsService.getTasks(this.selectedListNum).subscribe(myObserver)
  }

  searchByLetters(letters){
    this.requiredLetters=letters
    const myObserver = {
      next: (tasks)=>{
        this.tasks = tasks.filter(x=>x.description.includes(letters))
      },
      error: err => console.error('Observer got an error: ' + err),
    };
    this.listsService.getTasks(this.selectedListNum).subscribe(myObserver)
  }
}

