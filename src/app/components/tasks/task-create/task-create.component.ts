import { Component } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { Task } from '../../../models/response/task.response';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
})
export class TaskCreateComponent {
  task: Task = {
    title: '',
    description: '',
    dueDate: '',
  };

  constructor(private taskService: TaskService, private router: Router) {}

  createTask() {
    this.taskService.createTask(this.task).subscribe(
      () => {
        this.router.navigate(['/tasks/list']);
      },
      (error) => {
        console.error('Error creating task', error);
      }
    );
  }
}
