import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import {TodosService} from '../../../../services/todos.service'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() task;
  @Output() taskToDelete = new EventEmitter();
  @Output() taskToUpdate = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  deleteATask(taskId){
    this.taskToDelete.emit(taskId)
  }

  toggleCompleted(taskId){
    this.task.isCompleted=!this.task.isCompleted
    const updatedTask = this.task
    this.taskToUpdate.emit(updatedTask)
  }
}
