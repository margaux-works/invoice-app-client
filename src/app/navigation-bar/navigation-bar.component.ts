import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchApiDataService } from '../services/fetch-api-data.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent {}
