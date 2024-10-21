import { Component, OnInit } from '@angular/core';
import { Task } from '../../../models/response/task.response';
import { TaskService } from '../../../services/task.service';
import { User } from '../../../models/response/user.response';
import { UserService } from '../../../services/user.service';
import { AssignmentService } from '../../../services/assignment.service';
@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.css'],
})
export class AssignTasksComponent implements OnInit {
  tasks: Task[] = [];
  users: User[] = [];
  selectedTasks: Task[] = [];
  selectedUsers: User[] = [];
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private assignmentService: AssignmentService
  ) { }
  ngOnInit() {
    this.loadTasks();
    this.loadUsers();
  }
  loadTasks() {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }
  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
  assignTasks() {
    const taskIds = this.selectedTasks.map((t) => t.id).filter((id): id is number => id !== undefined);
    const userIds = this.selectedUsers.map((u) => u.id).filter((id): id is number => id !== undefined);
    this.assignmentService.assignTasks(taskIds, userIds).subscribe(
      () => {
        alert('Tasks assigned successfully');
        // Reset selections
        this.selectedTasks = [];
        this.selectedUsers = [];
      },
      (error) => {
        console.error('Error assigning tasks', error);
      }
    );
  }
}