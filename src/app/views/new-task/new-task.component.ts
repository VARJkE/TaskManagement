import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from 'src/app/data/Data';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  @ViewChild('modal_1') modal_1!: TemplateRef<any>;
  @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;

  taskAddForm!: FormGroup;

  priorities = this.dataHandler.priorities;
  users = this.dataHandler.users;
  statuses = this.dataHandler.statuses;

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

  constructor(private dataHandler: DataHandlerService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.taskAddForm = this.formBuilder.group(
      {
        taskTitle: ['', Validators.required],
        taskDesc: ['', Validators.required],
        taskPriorities: ['', Validators.required],
        taskAssignTo: ['', Validators.required],
        taskStatus: ['', Validators.required],
        taskDate: ['', Validators.required]
      })
  }


  addNewTask(): void {
    this.dataHandler.addTask(
      {
        id: Data.tasks.length + 1,
        title: this.taskAddForm.value.taskTitle,
        desc: this.taskAddForm.value.taskDesc,
        priority: this.dataHandler.priorities[this.taskAddForm.value.taskPriorities - 1],
        assignTo: this.dataHandler.users[this.taskAddForm.value.taskAssignTo - 1],
        status: this.dataHandler.statuses[this.taskAddForm.value.taskStatus - 1],
        date: this.taskAddForm.value.taskDate
      }),
      this.closeDialog();
    this.taskAddForm.reset();

  }

}
