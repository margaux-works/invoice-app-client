import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginFormComponent } from '../login/login.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

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
}
