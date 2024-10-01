import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  isTaskModalFormVisible = signal(false);

  constructor() { }

  showModal(status: boolean){
    this.isTaskModalFormVisible.set(status); 
  }

}
