import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService
      .register(this.username, this.email, this.password)
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration error', error);
        }
      );
  }
}
