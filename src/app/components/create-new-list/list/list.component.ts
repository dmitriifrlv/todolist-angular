import { Component, Input,Output, EventEmitter } from '@angular/core';
import { List } from "../../../Models/List"
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() list:List
  @Input() listId:string
  @Output() listToDelete = new EventEmitter();
  @Output() listNum = new EventEmitter();
  constructor() { }

  onDeleteAList(id:string) {
    this.listToDelete.emit(id)
  }
  onListClick(){
    this.listNum.emit(1)
  }
}
