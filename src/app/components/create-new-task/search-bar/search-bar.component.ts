import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  enteredLetters: string | number = ''
  @Output() searchByLetters = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  searchListener(e){
    this.enteredLetters=e
    this.searchByLetters.emit(this.enteredLetters)
  }
}
