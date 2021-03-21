import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  @Input() task;
  @Output() taskToDelete = new EventEmitter();
  @Output() taskToUpdate = new EventEmitter();
  
  constructor() { }

  deleteATask(taskId){
    this.taskToDelete.emit(taskId)
  }

  toggleCompleted(taskId){
    this.task.isCompleted=!this.task.isCompleted
    const updatedTask = this.task
    this.taskToUpdate.emit(updatedTask)
  }
}
