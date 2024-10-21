import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { TaskCreateComponent } from './components/tasks/task-create/task-create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { MenubarModule } from 'primeng/menubar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssignTasksComponent } from './components/tasks/assign-tasks/assign-tasks.component';
import { PickListModule } from 'primeng/picklist';
import { ListboxModule } from 'primeng/listbox';
import { MyTasksComponent } from './components/my-tasks/my-tasks.component';
import { ChartModule } from 'primeng/chart';
import { UserTaskGraphComponent } from './components/displays/user-task-graph/user-task-graph.component';
import { ManageAssignmentsComponent } from './components/tasks/manage-assignments/manage-assignments.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TaskListComponent,
    TaskCreateComponent,
    DashboardComponent,
    NavbarComponent,
    AssignTasksComponent,
    MyTasksComponent,
    UserTaskGraphComponent,
    ManageAssignmentsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    //#region PrimeNG
    TableModule,
    CalendarModule,
    MenubarModule,
    PickListModule,
    ListboxModule,
    ChartModule,
    //#endregion
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
