import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  emailAddress: string = '';
  password: string = '';

  constructor(
    private readonly router: Router,
  ) {}

  handleOnSubmit(event: Event) {
    this.authService
      .login({
        identifier: this.emailAddress,
        password: this.password,
      })
      .pipe().subscribe({
        next: () => this.router.navigate(['/tickets']),
      });
  }
}
