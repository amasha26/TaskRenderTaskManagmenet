import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChatInboxComponent } from './chat-inbox/chat-inbox.component';
import { RouteGuardService } from './shared/auth/route-guard.service';
import { TaskListComponent } from './task-list/task-list.component';
import { NavLayoutComponent } from './_layout/nav-layout/nav-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'task-list',
    component: NavLayoutComponent,
    children: [
      {
        path: 'add-task',
        component:AddTaskComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'view-tasks',
        component:TaskListComponent,
        canActivate: [RouteGuardService],
      },
    ],
  },
  {
    path: 'chat',
    component: NavLayoutComponent,
    children: [
      {
        path: 'users',
        component:ChatInboxComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'view-tasks',
        component:TaskListComponent,
        canActivate: [RouteGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
