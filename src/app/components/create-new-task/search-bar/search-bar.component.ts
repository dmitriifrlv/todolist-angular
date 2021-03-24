import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent  {
  enteredLetters: string | number = ''
  @Output() searchByLetters = new EventEmitter();
  constructor() { }

  searchListener(e:string | number){
    this.enteredLetters=e
    this.searchByLetters.emit(this.enteredLetters)
  }
}
