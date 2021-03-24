import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../Models/Task'
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  @Input() task:Task;
  @Output() taskToDelete = new EventEmitter();
  @Output() taskToUpdate = new EventEmitter();
  
  constructor() { }

  deleteATask(taskId:string){
    this.taskToDelete.emit(taskId)
  }

  toggleCompleted(){
    this.task.isCompleted=!this.task.isCompleted
    const updatedTask = this.task
    this.taskToUpdate.emit(updatedTask)
  }
}
