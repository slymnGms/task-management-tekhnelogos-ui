import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/response/task.response';
import { TaskService } from '../../services/task.service';
import { ChartDatasetCustomTypesPerDataset, LabelItem } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels: LabelItem[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDatasetCustomTypesPerDataset[] = [];

  constructor(private taskService: TaskService) { }
  ngOnInit() {
    this.loadMyTasks();
  }
  loadMyTasks() {
    this.taskService.getAttendedTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }
}