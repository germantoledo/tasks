import { Component, effect, OnInit } from '@angular/core';
import { Task } from 'src/app/interface/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterSelected: string = 'Todos'

  constructor(private taskService: TaskService){
    effect(() => {
      this.taskService.updateTasksStatus();
      this.getTasks();
    });
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = this.tasks;
    this.filterSelected = 'Todos';
  }

  filterByCompletedTasks(){
    this.filteredTasks = [];
    this.tasks.filter((task) => {
      if(task.status === 'Completado'){
        this.filteredTasks.push(task);
      }
    });
    this.filterSelected = 'Completados';
  }

  filterByPendingTasks(){
    this.filteredTasks = [];
    this.tasks.filter((task) => {
      if(task.status === 'Pendiente'){
        this.filteredTasks.push(task);
      }
    });
    this.filterSelected = 'Pendientes';
  }
}
