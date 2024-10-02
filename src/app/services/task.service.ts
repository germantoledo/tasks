import { Injectable, signal } from '@angular/core';
import { Task } from '../interface/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  isTaskModalFormVisible = signal(false);
  updateTasksStatus = signal(false);

  tasks: Task[] = [];

  constructor() { }

  showModal(status: boolean) {
    this.isTaskModalFormVisible.set(status);
  }

  updateTasks(){
    this.updateTasksStatus.set(!this.updateTasksStatus());
  }

  createTask(task: Task) {
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.updateTasks();
  }

  getTasks() {
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks') ?? '');
      return JSON.parse(localStorage.getItem('tasks') ?? '');
    } else {
      return this.tasks;
    }

  }

  markAsComplete(taskID: number) {
    const task = this.tasks.find(task => task.id === taskID);
    if (task) {
      if (task.status !== 'Completado') {
        task.status = 'Completado';
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.updateTasks();
      }
    }
  }

  unMarkAsComplete(taskID: number) {
    const task = this.tasks.find(task => task.id === taskID);
    if (task) {
      if (task.status !== 'Pendiente') {
        task.status = 'Pendiente';
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.updateTasks();
      }
    }
  }


}
