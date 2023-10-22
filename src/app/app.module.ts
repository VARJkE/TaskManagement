import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewTaskComponent } from './views/new-task/new-task.component';
import { TasksListComponent } from './views/tasks-list/tasks-list.component';
import { TaskProgressComponent } from './views/task-progress/task-progress.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    NewTaskComponent,
    TasksListComponent,
    TaskProgressComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
