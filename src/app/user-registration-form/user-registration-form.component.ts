import { Component } from '@angular/core';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  imports: [FormsModule],
})
export class UserRegistrationFormComponent {
  userData = { username: '', email: '', password: '' };

  constructor(
    private fetchApiData: FetchApiDataService,
    private toastService: ToastService,
    private router: Router
  ) {}

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.toastService.showToast('Registration successful! Please log in.');

        this.router.navigateByUrl('login').then((success) => {
          console.log('Navigation success:', success);
        });
      },
      (error) => {
        const errorMessage =
          error?.error?.message || 'An unexpected error occurred';
        console.error('Registration error:', error);
        this.toastService.showToast(`Error: ${errorMessage}`);
      }
    );
  }
}
