import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/interface/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  taskCompleted: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskCompleted = this.task.status === 'Completado';
  }

  toggleTaskStatus(task: Task) {
    if (task.status === 'Completado') {
      this.taskService.unMarkAsComplete(task.id);
    } else {
      this.taskService.markAsComplete(task.id);
    }
  }
}
