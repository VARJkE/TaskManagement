import { Injectable } from '@angular/core';
import { Task } from '../classes/Task';
import { Data } from '../data/Data';
import { Status } from '../classes/Status';
import { Priority } from '../classes/Priority';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() { }

  statuses: Status[] = Data.statuses;
  priorities: Priority[] = Data.priorities;
  users: User[] = Data.users;
  tasks: Task[] = Data.tasks;

  getTaskByStatus(id: number): Task[] {
    return Data.tasks.filter(task => task.status.id === id);
  }

  addTask(task: Task): void {
    Data.tasks.push(task);
  }

}
