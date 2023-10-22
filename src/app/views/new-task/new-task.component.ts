import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Data } from 'src/app/data/Data';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  @ViewChild('modal_1') modal_1!: TemplateRef<any>;
  @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;

  taskTitle: string = '';
  taskDesc: string = '';
  taskPriorities = this.dataHandler.priorities;
  taskAssignTo = this.dataHandler.users;
  taskStatus = this.dataHandler.statuses;
  taskDate: Date = new Date();
  selectedPriority: number = 0;
  selectedUser: number = 0;
  selectedStatus: number = 0

  backdrop: any;

  showDialog() {
    let view = this.modal_1.createEmbeddedView(null);
    this.vc.insert(view);
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
    this.modal_1.elementRef.nativeElement.previousElementSibling.style.display = 'block';
    this.backdrop = document.createElement('DIV')
    this.backdrop.className = 'modal-backdrop';
    document.body.appendChild(this.backdrop)

  }

  closeDialog() {
    this.vc.clear()
    document.body.removeChild(this.backdrop)
  }

  constructor(private dataHandler: DataHandlerService) {

  }

  addNewTask(): void {
    this.dataHandler.addTask(
      {
        id: Data.tasks.length + 1,
        title: this.taskTitle,
        desc: this.taskDesc,
        priority: this.dataHandler.priorities[this.selectedPriority - 1],
        assignTo: this.dataHandler.users[this.selectedUser - 1],
        status: this.dataHandler.statuses[this.selectedStatus - 1],
        date: this.taskDate

      }),
      this.closeDialog();
    this.resetForm();

  }

  resetForm(): void {
    this.taskTitle = '';
    this.taskDesc = '';
    this.taskDate = new Date();
    this.selectedPriority = 0;
    this.selectedUser = 0;
    this.selectedStatus = 0
  }
}
