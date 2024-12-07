import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent {
  constructor(private router: Router, private toastService: ToastService) {}
  showLogOutBox = false;

  ngOnInit(): void {}

  logoutUser(): void {
    localStorage.clear();

    this.toastService.showToast('Logged out successfully!');
    this.router.navigate(['welcome']);
  }

  toggleLogoutBox() {
    this.showLogOutBox = !this.showLogOutBox;
  }
}
