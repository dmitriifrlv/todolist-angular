import { Component, OnChanges, Input,Output, EventEmitter } from '@angular/core';
import  { TodosService }  from '../../../../services/todos.service'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnChanges {
  @Input() list
  @Input() listId
  @Input() allTasks
  @Output() listToDelete = new EventEmitter();
  tasks

  constructor(private listsService:TodosService) { }

  ngOnChanges() {
  const myObserver = {
      next: (tasks)=>this.tasks=tasks,
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log(this.tasks),
    };
    this.listsService.getTasks(this.listId).subscribe(myObserver)
  }
  onClick(){
    console.log(this.listId)
    console.log(this.allTasks)
    let tasks=this.allTasks.filter(x=>x.listsId===this.listId)
    console.log(tasks)
  }

  onDeleteAList(id) {
    console.log(id)
    this.listToDelete.emit(id)
  }
}
