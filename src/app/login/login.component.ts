import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchApiDataService } from '../services/fetch-api-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private fetchApiData: FetchApiDataService) {}
}
