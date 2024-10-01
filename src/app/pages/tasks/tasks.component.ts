import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  constructor(private taskService: TaskService){}

  showModal(status: boolean){
    this.taskService.showModal(status);
  }

  getModalStatus(){
    return this.taskService.isTaskModalFormVisible();
  }

}
