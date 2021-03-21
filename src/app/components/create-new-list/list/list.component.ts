import { Component, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() list
  @Input() listId
  @Output() listToDelete = new EventEmitter();

  constructor() { }

  onDeleteAList(id) {
    this.listToDelete.emit(id)
  }
}
