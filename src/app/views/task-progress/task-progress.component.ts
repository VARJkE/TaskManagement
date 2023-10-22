import { Component } from '@angular/core';
import { Task } from 'src/app/classes/Task';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-task-progress',
  templateUrl: './task-progress.component.html',
  styleUrls: ['./task-progress.component.css']
})
export class TaskProgressComponent {
  tasks = this.dataHandler.tasks;


  constructor(private dataHandler: DataHandlerService) {

  }
  
  getTasks(id: number): Task[] {
    return this.dataHandler.getTaskByStatus(id);
  }
}
