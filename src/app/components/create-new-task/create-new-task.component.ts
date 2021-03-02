import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.css']
})
export class CreateNewTaskComponent implements OnInit {
  enteredTask:string|number = '';
  @Output() taskCreated = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onAddTask(){
    const task = {
      description:this.enteredTask,
      taskId: uuidv4(),
      isCompleted: false
    }

    this.taskCreated.emit(task)
  }
}

