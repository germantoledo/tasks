import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Person } from 'src/app/interface/person.interface';
import { Task } from 'src/app/interface/task.interface';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() visible = false;

  taskForm!: FormGroup;

  persons: Person[] = [];

  constructor(private taskService: TaskService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.taskForm = this.fb.group({
      title: [null, [Validators.required]],
      limitDate: [null, [Validators.required]],
      fullname: [null, [Validators.required, Validators.minLength(5)]],
      age: [null, [Validators.required, Validators.min(19)]],
      skills: this.fb.array([], Validators.required),
      status: ['Pendiente']
    });
  }

  get skills(): FormArray {
    return this.taskForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(new FormControl('', Validators.required));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  addPerson() {
    if (this.taskForm.get('age')?.invalid ||
      this.taskForm.get('fullname')?.invalid ||
      this.taskForm.get('skills')?.invalid ||
      this.nameNotRepeatedValidator(this.taskForm.get('fullname')?.value)) {
      return;
    }

    let person: Person = {
      id: this.persons.length + 1,
      age: this.taskForm.value.age,
      fullname: this.taskForm.value.fullname,
      skills: this.taskForm.value.skills
    };

    this.persons.push(person);
  }

  saveTask() {

    if (this.taskForm.get('title')?.invalid ||
      this.taskForm.get('limitDate')?.invalid) {
      return;
    }

    let data: Task = {
      id: this.taskService.getTasks().length + 1,
      persons: this.persons,
      limit_date: this.taskForm.get('limitDate')?.value,
      title: this.taskForm.get('title')?.value,
      status: this.taskForm.get('status')?.value,
    };

    this.taskService.createTask(data);
    this.taskForm.reset();

  }

  removePerson(id: number) {
    this.persons = this.persons.filter(person => person.id !== id);
  }

  nameNotRepeatedValidator(fullname: string) {
    const nameExists = this.persons.some(person => person.fullname === fullname);
    if (nameExists) {
      return true;
    }
    return false;
  }

  showModal(status: boolean) {
    this.taskService.showModal(status);
  }

  getModalStatus() {
    return this.taskService.isTaskModalFormVisible();
  }
}