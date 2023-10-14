import { Component } from '@angular/core';
import { Task } from 'src/app/classes/Task';
import { Data } from 'src/app/data/Data';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent {

  constructor(private dataHandler: DataHandlerService){

  }

  ngOnInit() {
    console.log()
  }

  getTasks(id: number): Task[] {
    return this.dataHandler.getTaskByStatus(id);
  }
}
