import { Component } from '@angular/core';
import { Task } from '../../models/response/task.response';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.css'
})
export class MyTasksComponent {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) { }
  ngOnInit() {
    this.loadMyTasks();
  }
  loadMyTasks() {
    this.taskService.getMyTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }
}