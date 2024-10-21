import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.setMenuItems();
  }

  setMenuItems() {
    if (this.authService.isLoggedIn()) {
      // User is logged in
      this.items = [
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-home',
          routerLink: '/dashboard',
        },
        {
          label: 'Tasks',
          icon: 'pi pi-fw pi-list',
          items: [
            {
              label: 'My Tasks',
              icon: 'pi pi-fw pi-user',
              routerLink: '/my-tasks',
            },
            {
              label: 'All Tasks',
              icon: 'pi pi-fw pi-list-check',
              routerLink: '/tasks/list',
            },
            {
              label: 'Create Task',
              icon: 'pi pi-fw pi-plus',
              routerLink: '/tasks/create',
            },
            {
              label: 'Assign Tasks',
              icon: 'pi pi-fw pi-user-plus',
              routerLink: '/tasks/assign',
            },
            {
              label: 'Manage Assignments',
              icon: 'pi pi-fw pi-cog',
              routerLink: '/tasks/assignments',
            },
          ],
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-sign-out',
          command: () => this.logout(),
        },
      ];
    } else {
      // User is not logged in
      this.items = [
        {
          label: 'Login',
          icon: 'pi pi-fw pi-sign-in',
          routerLink: '/login',
        },
        {
          label: 'Register',
          icon: 'pi pi-fw pi-user-plus',
          routerLink: '/register',
        },
      ];
    }
  }

  logout() {
    this.authService.logout();
    this.setMenuItems();
    this.router.navigate(['/login']);
  }
}
