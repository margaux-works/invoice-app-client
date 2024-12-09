import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent {
  constructor(
    private router: Router,
    private toastService: ToastService,
    public themeService: ThemeService
  ) {}
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

  toggleDarkMode(): void {
    this.themeService.toggleTheme();
    console.log('dark mode toggled');
  }
}
