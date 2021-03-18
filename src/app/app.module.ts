import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CreateNewListComponent } from './components/create-new-list/create-new-list.component';
import { ListsCardHeaderComponent } from './components/create-new-list/lists-card-header/lists-card-header.component';
import { TaskListHeaderComponent } from './components/create-new-task/task-list-header/task-list-header.component';
import { CreateNewTaskComponent } from './components/create-new-task/create-new-task.component';
import { TasksComponent } from './components/create-new-task/tasks/tasks.component';
import { SearchBarComponent } from './components/create-new-task/search-bar/search-bar.component';
import { CheckBoxComponent } from './components/create-new-task/check-box/check-box.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio'
import {MatIconModule} from '@angular/material/icon';
import { ListComponent } from './components/create-new-list/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateNewListComponent,
    ListsCardHeaderComponent,
    TaskListHeaderComponent,
    CreateNewTaskComponent,
    TasksComponent,
    SearchBarComponent,
    CheckBoxComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    MatRadioModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
