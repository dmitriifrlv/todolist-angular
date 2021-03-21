import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TodosService } from "../../../services/todos.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.css']
})
export class CreateNewTaskComponent implements OnInit {
  @Input()tasks
  @Input() selectedListNum:number
  @Input() lists
  @Input() selectedList
  @Output() taskCreated = new EventEmitter();

  requiredLetters:string=''
  showAll:Boolean = true
  selectedListId

  taskTitleInput = new FormGroup({
    taskTitle: new FormControl('', [
      Validators.compose([Validators.minLength(1), Validators.required])
    ])
  })

  constructor(private listsService:TodosService) { }

  ngOnInit() {
    // this.selectedListId=this.selectedList.id
    // console.log(this.selectedList)
    // this.listsService.getTasks(this.selectedList.id).subscribe((tasks)=>{
    //   this.showAll===true 
    //   ? this.tasks=tasks.filter(x=>x.description.includes(this.requiredLetters))
    //   : this.tasks=tasks.filter(x=>x.isCompleted===false && x.description.includes(this.requiredLetters))
    // })
  }

  test(){
    console.log(this.selectedList.id)
    
  }

  onAddTask(){
    if (this.taskTitleInput.valid) {
      const task = {
        description:this.taskTitleInput.value.taskTitle,
        id: uuidv4(),
        isCompleted: false,
        listsId:this.selectedList.id
      }
      const myObserver = {
        next:  ()=>this.listsService.getTasks(this.selectedList.id).subscribe((tasks)=>{
          this.showAll===true 
          ? this.tasks=tasks.filter(x=>x.description.includes(this.requiredLetters))
          : this.tasks=tasks.filter(x=>x.isCompleted===false && x.description.includes(this.requiredLetters))
        }),
        error: err => console.error('Observer got an error: ' + err),
      };
      this.listsService.addANewTask(task).subscribe(myObserver)
      this.selectedList.numberOfAllTasks+=1
      this.listsService.listUpdate(this.selectedList.id,this.selectedList).subscribe()
      this.taskTitleInput.setValue({taskTitle:''})
    } 
  }

  onDeleteATask(id){
    const myObserver = {
      next: ()=>{
        const nestedObserver = {
          next:(tasks)=>{
            this.showAll===true 
            ? this.tasks=tasks.filter(x=>x.description.includes(this.requiredLetters))
            : this.tasks=tasks.filter(x=>x.isCompleted===false && x.description.includes(this.requiredLetters))
          },
          complete: ()=>{
            this.selectedList.numberOfCompletedTasks=this.tasks.filter(x=>x.isCompleted===true).length;
            this.selectedList.numberOfAllTasks=this.tasks.length
            this.listsService.listUpdate(this.selectedList.id,this.selectedList).subscribe()
          }
        }
        this.listsService.getTasks(this.selectedList.id).subscribe(nestedObserver)},
      error: err => console.error('Observer got an error: ' + err)
    };
    this.listsService.deleteATask(id).subscribe(myObserver)
  }

  onUpdateATask(updatedTask) {
    const myObserver = {
      next: ()=> {
        if (this.showAll===false) {
        this.listsService.getTasks(this.selectedList.id).subscribe(tasks=>this.tasks=tasks.filter(x=>x.isCompleted===false))
      } else {
        this.listsService.getTasks(this.selectedList.id).subscribe(tasks=>this.tasks=tasks)
      }
    },
      error: err => console.error('Observer got an error: ' + err)
    };
    this.listsService.toggleCompleted(updatedTask.id,updatedTask).subscribe(myObserver)
    
    let numberOfCompletedTasks = this.tasks.filter(x=>x.isCompleted===true).length;
    this.selectedList.numberOfCompletedTasks=numberOfCompletedTasks
    this.listsService.listUpdate(this.selectedList.id,this.selectedList).subscribe()
  }
  

  uncompletedFilter(){
    this.showAll=false
    this.tasks=this.tasks.filter(x=>x.isCompleted===false && x.description.includes(this.requiredLetters)) 
  }

  showAllTasks(){
    this.showAll=true;

    const myObserver = {
      next: (tasks)=>{
        this.tasks = tasks.filter(x=>x.description.includes(this.requiredLetters))
      }}
    this.listsService.getTasks(this.selectedList.id).subscribe(myObserver)
  }

  searchByLetters(letters){
    this.requiredLetters=letters
    const myObserver = {
      next: (tasks)=>{
        this.tasks = tasks.filter(x=>x.description.includes(letters))
      },
      error: err => console.error('Observer got an error: ' + err),
    };
    this.listsService.getTasks(this.selectedList.id).subscribe(myObserver)
  }
}