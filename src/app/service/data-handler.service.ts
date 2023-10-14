import { Injectable } from '@angular/core';
import { Task } from '../classes/Task';
import { Data } from '../data/Data';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() { }

  getTaskByStatus(id: number): Task[] {
    return Data.tasks.filter(task => task.status.id === id);
  }
}
