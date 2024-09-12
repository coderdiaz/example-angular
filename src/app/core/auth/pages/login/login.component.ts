import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  emailAddress: string = '';
  password: string = '';

  handleOnSubmit(event: Event) {
    this.authService
      .login({
        identifier: this.emailAddress,
        password: this.password,
      })
      .subscribe();
  }
}
