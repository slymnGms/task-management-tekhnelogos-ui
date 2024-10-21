import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { AuthGuard } from './guards/auth.guard';
import { TaskCreateComponent } from './components/tasks/task-create/task-create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyTasksComponent } from './components/my-tasks/my-tasks.component';
import { AssignTasksComponent } from './components/tasks/assign-tasks/assign-tasks.component';
import { ManageAssignmentsComponent } from './components/tasks/manage-assignments/manage-assignments.component';

const routes: Routes = [
  // Auth routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Protected routes
  { path : '', component : DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'my-tasks', component: MyTasksComponent, canActivate: [AuthGuard] },
  { path: 'tasks/list', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'tasks/create', component: TaskCreateComponent, canActivate: [AuthGuard] },
  { path: 'tasks/assign', component: AssignTasksComponent, canActivate: [AuthGuard] },
  { path: 'tasks/assignments', component: ManageAssignmentsComponent, canActivate: [AuthGuard] },

  // Other routes
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
