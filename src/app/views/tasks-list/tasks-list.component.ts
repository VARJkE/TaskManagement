import { Component, Pipe, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Priority } from 'src/app/classes/Priority';
import { Status } from 'src/app/classes/Status';
import { Task } from 'src/app/classes/Task';
import { User } from 'src/app/classes/User';
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
  indexOfTask: number = 0;

  taskEditForm!: FormGroup;

  priorities: Priority[] = this.dataHandler.priorities;
  users: User[] = this.dataHandler.users;
  statuses: Status[] = this.dataHandler.statuses;

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

    this.taskEditForm = this.formBuilder.group(
      {
        taskTitle: [this.dataHandler.tasks[this.indexOfTask].title, Validators.required],
        taskDesc: [this.dataHandler.tasks[this.indexOfTask].desc, Validators.required],
        taskPriorities: [this.dataHandler.tasks[this.indexOfTask].priority.id, Validators.required],
        taskAssignTo: [this.dataHandler.tasks[this.indexOfTask].assignTo.id, Validators.required],
        taskStatus: [this.dataHandler.tasks[this.indexOfTask].status.id, Validators.required],
        taskDate: [this.dataHandler.tasks[this.indexOfTask].date, Validators.required]
      })

  }

  closeDialog() {
    this.vc.clear()
    document.body.removeChild(this.backdrop)
  }

  constructor(private dataHandler: DataHandlerService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {

  }

  getTasks(id: number): Task[] {
    return this.dataHandler.getTaskByStatus(id);
  }

  saveEditedTask() {

    this.dataHandler.tasks[this.getTaskIndexById(this.taskId)] =
    {
      id: this.taskId,
      title: this.taskEditForm.value.taskTitle,
      desc: this.taskEditForm.value.taskDesc,
      date: this.taskEditForm.value.taskDate,
      priority: this.dataHandler.priorities[this.taskEditForm.value.taskPriorities - 1],
      assignTo: this.dataHandler.users[this.taskEditForm.value.taskAssignTo - 1],
      status: this.dataHandler.statuses[this.taskEditForm.value.taskStatus - 1],
    };

    this.closeDialog();
    this.taskEditForm.reset();

  }

  deleteTask(taskId: number): void {
    const indexById = this.getTaskIndexById(taskId);
    this.dataHandler.tasks.splice(indexById, 1);
  }


  getTaskIndexById(taskId: number): number {
    return this.dataHandler.tasks.findIndex(index => index.id === taskId);
  }
}
