import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Status } from 'src/app/classes/Status';
import { Task } from 'src/app/classes/Task';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent {
  @ViewChild('modal_1') modal_1!: TemplateRef<any>;
  @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;

  taskId: number = 0;
  taskTitle: string = '';
  taskDesc: string = '';
  taskPriorities = this.dataHandler.priorities;
  taskAssignTo = this.dataHandler.users;
  taskStatus = this.dataHandler.statuses;
  taskDate: Date = new Date();
  selectedPriority: number = 0;
  selectedUser: number = 0;
  selectedStatus: number = 0
  indexOfTask: number = 0;
  backdrop: any;

  showDialog(taskId: number) {
   
    let view = this.modal_1.createEmbeddedView(null);
    
    this.vc.insert(view);
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
    this.modal_1.elementRef.nativeElement.previousElementSibling.style.display = 'block';
    this.backdrop = document.createElement('DIV')
    this.backdrop.className = 'modal-backdrop';
    document.body.appendChild(this.backdrop)
    this.indexOfTask = this.getTaskIndexById(taskId);
    this.taskId = taskId;
    this.taskTitle = this.dataHandler.tasks[this.indexOfTask].title;
    this.taskDesc = this.dataHandler.tasks[this.indexOfTask].desc;
    this.selectedPriority = this.dataHandler.tasks[this.indexOfTask].priority.id;
    this.selectedStatus = this.dataHandler.tasks[this.indexOfTask].status.id;
    this.selectedUser = this.dataHandler.tasks[this.indexOfTask].assignTo.id;
    
  }

  closeDialog() {
    this.vc.clear()
    document.body.removeChild(this.backdrop)
    this.resetForm();
  }

  constructor(private dataHandler: DataHandlerService) {

  }

  statuses: Status[] = this.dataHandler.statuses;


  ngOnInit() {

  }

  getTasks(id: number): Task[] {
    return this.dataHandler.getTaskByStatus(id);
  }

  saveEditedTask() {
    
    this.dataHandler.tasks[this.getTaskIndexById(this.taskId)] =
    {
      id: this.taskId,
      title: this.taskTitle,
      desc: this.taskDesc,
      date: this.taskDate,
      priority: this.dataHandler.priorities[this.selectedPriority - 1],
      assignTo: this.dataHandler.users[this.selectedUser - 1],
      status: this.dataHandler.statuses[this.selectedStatus - 1],
    };

    this.closeDialog();

  }

  deleteTask(taskId: number): void {
    const indexById = this.getTaskIndexById(taskId);
    this.dataHandler.tasks.splice(indexById, 1);
  }

  resetForm(): void {
    this.taskTitle = '';
    this.taskDesc = '';
    this.taskDate = new Date();
    this.selectedPriority = 0;
    this.selectedUser = 0;
    this.selectedStatus = 0
  }

  getTaskIndexById(taskId: number): number {
    return this.dataHandler.tasks.findIndex(index => index.id === taskId);
  }
}
