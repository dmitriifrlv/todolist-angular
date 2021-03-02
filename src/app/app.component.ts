import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedLists = [];

  onListAdded(list) {
    this.storedLists.push(list)
    console.log(this.storedLists)
  }
  onTaskAdded(task){
    console.log(task)
    
    this.storedLists[0].tasks.push(task)
    // console.log(this.storedLists)
  }
}
