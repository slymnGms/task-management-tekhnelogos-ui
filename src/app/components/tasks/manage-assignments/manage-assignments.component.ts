import { Component, OnInit } from '@angular/core';
import { UserTask } from '../../../models/response/user-task.response';
import { AssignmentService } from '../../../services/assignment.service';
@Component({
  selector: 'app-manage-assignments',
  templateUrl: './manage-assignments.component.html',
  styleUrls: ['./manage-assignments.component.css']
})
export class ManageAssignmentsComponent implements OnInit {
  assignments: UserTask[] = [];
  constructor(
    private assignmentService: AssignmentService
  ) { }
  ngOnInit(): void {
    this.loadAssignments();
  }
  loadAssignments() {
    this.assignmentService.getAllAssignments().subscribe(
      data => {
        this.assignments = data;
      },
      error => {
        console.error('Error fetching assignments', error);
      }
    );
  }
  deleteAssignment(userId: number, taskId: number) {
    if (confirm('Are you sure you want to delete this assignment?')) {
      this.assignmentService.deleteUserTaskAssignment(userId, taskId).subscribe(
        () => {
          alert('Assignment deleted successfully');
          this.loadAssignments();
        },
        error => {
          console.error('Error deleting assignment', error);
        }
      );
    }
  }
}
