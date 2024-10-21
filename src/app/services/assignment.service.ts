import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserTask } from '../models/response/user-task.response';
@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private apiUrl = `${environment.apiUrl}/tasks`;
  constructor(private http: HttpClient) { }
  assignTasks(taskIds: number[], userIds: number[]) {
    return this.http.post(this.apiUrl+'/assign', {
      taskIds,
      userIds,
    });
  }
  getAllAssignments(): Observable<UserTask[]> {
    return this.http.get<UserTask[]>(`${this.apiUrl}/assignments`);
  }
  deleteUserTaskAssignment(userId: number, taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/assignments/${userId}/${taskId}`);
  }
}