import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service'; // Import ToastService
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  userData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    private toastService: ToastService, // Inject ToastService
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        // Logic for a successful user login
        localStorage.setItem('user', JSON.stringify(response.user)); // Store user info
        localStorage.setItem('token', response.token); // Store token
        console.log(
          'User saved in localStorage:',
          JSON.parse(localStorage.getItem('user') || '{}')
        );
        console.log(
          'Token saved in localStorage:',
          localStorage.getItem('token')
        );

        this.toastService.showToast('Logged in successfully!'); // Show toast
        this.router.navigate(['dashboard']);
      },
      (error) => {
        this.toastService.showToast(`Error: ${error}`); // Show toast on error
      }
    );
  }
}
