import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-auth',
  imports: [
    FormsModule
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  private router = inject(Router);
  private authService = inject(AuthService);
  private message = inject(NzMessageService);

  email = '';
  password = '';

  onSubmit() {
    // 1️⃣ Quick empty-field check
    if (!this.email.trim() || !this.password.trim()) {
      this.message.warning('Please fill in both email and password');
      return;
    }

    // 2️⃣ Call backend
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        // For now, backend just returns a string
        console.log('Login success:', res);
        this.message.success('Login successful');
        this.router.navigate(['/campaigns']);
      },
      error: (err) => {
        console.error('Login error:', err);
        if (err.status === 401) {
          this.message.error('Invalid credentials');
        } else {
          this.message.error('Failed to login. Please try again later.');
        }
      }
    });
  }

}
