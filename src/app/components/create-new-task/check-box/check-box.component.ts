import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {
  @Output() uncompletedFilter = new EventEmitter();
  @Output() showAllTasks = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  unCompleted(){
    this.uncompletedFilter.emit()
  }

  showAll(){
    this.showAllTasks.emit()
  }
}
