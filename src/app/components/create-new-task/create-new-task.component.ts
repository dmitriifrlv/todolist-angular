import { Component, Output, Input, EventEmitter } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TodosService } from "../../../services/todos.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { List } from '../../Models/List'
import { Task } from '../../Models/Task'

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.css']
})
export class CreateNewTaskComponent {
  @Input() tasks;
  @Input() selectedList:List;
  @Output() taskCreated = new EventEmitter();
  requiredLetters:string='';
  showAll:Boolean = true;

  taskTitleInput = new FormGroup({
    taskTitle: new FormControl('', [
      Validators.compose([Validators.minLength(1), Validators.required])
    ])
  });

  constructor(private listsService:TodosService) { }

  taskFilter = (tasks)=>{
    this.showAll===true 
    ? this.tasks=tasks.filter((task:Task)=>task.description.includes(this.requiredLetters))
    : this.tasks=tasks.filter((task:Task)=>task.isCompleted===false && task.description.includes(this.requiredLetters))
  };
  completedTasksNumber = () =>this.tasks.filter((task:Task)=>task.isCompleted===true).length;
  getTasks = () =>this.listsService.getTasks(this.selectedList.id).subscribe((tasks)=>this.tasks = tasks.filter((task:Task)=>task.description.includes(this.requiredLetters)))
  myObserver = {
    next: ()=>{
      const nestedObserver = {
        next:(tasks)=>{this.tasks=tasks},
        complete: ()=>{
          this.selectedList.numberOfCompletedTasks=this.completedTasksNumber()
          this.selectedList.numberOfAllTasks=this.tasks.length
          this.listsService.listUpdate(this.selectedList.id,this.selectedList).subscribe(()=>this.taskFilter(this.tasks))
        }
      }
      this.listsService.getTasks(this.selectedList.id).subscribe(nestedObserver)},
    complete: ()=>{this.tasks=this.taskFilter(this.tasks)}
  };

  //features:
  onAddTask(){
    if (this.taskTitleInput.valid) {
      const task = {
        description:this.taskTitleInput.value.taskTitle,
        id: uuidv4(),
        isCompleted: false,
        listsId:this.selectedList.id
      }
      this.listsService.addANewTask(task).subscribe(()=>this.listsService.getTasks(this.selectedList.id).subscribe((task)=>this.taskFilter(task)))
      this.selectedList.numberOfAllTasks+=1
      this.listsService.listUpdate(this.selectedList.id,this.selectedList).subscribe()
      this.taskTitleInput.setValue({taskTitle:''})
    } 
  }
  
  onDeleteATask(id:string){
    this.listsService.deleteATask(id).subscribe(this.myObserver)
  }

  onUpdateATask(updatedTask:Task) {
    this.listsService.toggleCompleted(updatedTask.id,updatedTask).subscribe(this.myObserver)
  }

  uncompletedFilter(){
    this.showAll=false
    this.tasks=this.tasks.filter((task:Task)=>task.isCompleted===false && task.description.includes(this.requiredLetters)) 
  }

  showAllTasks(){
    this.showAll=true;
    this.getTasks()
  }
  
  searchByLetters(letters:string){
    this.requiredLetters=letters
    this.getTasks()
  }
}