import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  invoices: any[] = [];

  // Inject FetchApiDataService
  constructor(private fetchApiData: FetchApiDataService) {}

  // Lifecycle hook that runs when the component is initialized
  ngOnInit(): void {
    this.getInvoices();
  }

  // Fetch invoices from the service
  getInvoices(): void {
    this.fetchApiData.getAllInvoices().subscribe({
      next: (data) => {
        this.invoices = data;
        console.log('Invoices fetched successfully:', this.invoices);
      },
      error: (err) => {
        console.error('Error fetching invoices:', err);
      },
    });
  }
}
