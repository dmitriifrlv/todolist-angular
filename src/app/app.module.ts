import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateNewListComponent } from './components/create-new-list/create-new-list.component';
import { ListsCardHeaderComponent } from './components/lists-card-header/lists-card-header.component';
import { TaskListHeaderComponent } from './components/task-list-header/task-list-header.component';
import { CreateNewTaskComponent } from './components/create-new-task/create-new-task.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CheckBoxComponent } from './components/check-box/check-box.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ListsComponent } from './components/lists/lists.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio'


@NgModule({
  declarations: [
    AppComponent,
    CreateNewListComponent,
    ListsComponent,
    ListsCardHeaderComponent,
    TaskListHeaderComponent,
    CreateNewTaskComponent,
    TasksComponent,
    SearchBarComponent,
    CheckBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
