import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username: string = '';
  emailAddress: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
  ) {}

  handleOnSubmit(event: Event) {
    console.log('Submitted', this.emailAddress, this.password);
    this.authService
      .register({
        username: this.username,
        email: this.emailAddress,
        password: this.password,
      })
      .subscribe();
  }
}
