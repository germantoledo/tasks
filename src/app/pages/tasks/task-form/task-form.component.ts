import { Component, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input() visible = false;

  constructor(private taskService: TaskService){}

  showModal(status: boolean){
    this.taskService.showModal(status);
  }

  getModalStatus(){
    return this.taskService.isTaskModalFormVisible();
  }
}
