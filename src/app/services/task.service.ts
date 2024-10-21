import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/response/task.response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GroupedTasks } from '../models/response/grouped-tasks.response';
import { TaskWithUsers } from '../models/response/task-with-users.response';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;
  constructor(private http: HttpClient) { }
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
  getGroupedTasks(): Observable<GroupedTasks[]> {
    return this.http.get<GroupedTasks[]>(`${this.apiUrl}`);
  }
  getMyTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/mytasks`);
  }
  getUsersWithTasks(): Observable<TaskWithUsers[]> {
    return this.http.get<TaskWithUsers[]>(`${this.apiUrl}/tasks-by-users`);
  } 
  getAttendedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/attended-tasks`);
  }

}