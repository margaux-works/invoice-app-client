import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginFormComponent } from '../login/login.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  imports: [
    UserLoginFormComponent,
    UserRegistrationFormComponent,
    CommonModule,
  ],
})
export class WelcomePageComponent {
  isLoginModalOpen = false;
  isRegistrationModalOpen = false;

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  openLoginModal(): void {
    this.isLoginModalOpen = true;
  }

  openRegistrationModal(): void {
    this.isRegistrationModalOpen = true;
  }

  closeModal(): void {
    this.isLoginModalOpen = false;
    this.isRegistrationModalOpen = false;
  }

  loginAsGuest(): void {
    this.fetchApiData.guestLogin().subscribe(
      (response) => {
        console.log('Login as guest successful:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', 'guest');
        this.router.navigate(['dashboard']);
      },
      (error) => {
        console.error('Guest login failed', error);
      }
    );
  }
}
