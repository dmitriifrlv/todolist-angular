import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent {
  @Output() uncompletedFilter = new EventEmitter();
  @Output() showAllTasks = new EventEmitter();
  constructor() { }

  unCompleted(){
    this.uncompletedFilter.emit()
  }

  showAll(){
    this.showAllTasks.emit()
  }
}
