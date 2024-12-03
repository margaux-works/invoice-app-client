import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { RouterModule } from '@angular/router';
import { InvoiceCreateComponent } from '../invoice-create/invoice-create.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, InvoiceCreateComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  invoices: any[] = [];
  showCreateInvoice: boolean = false;

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

  // Called when an invoice is created
  onCreateInvoice(newInvoice: any): void {
    console.log('Invoice created:', newInvoice); // Debug log
    this.invoices.push(newInvoice); // Add new invoice to the list
    this.showCreateInvoice = false; // Hide the form after creation
  }

  // Called when invoice creation is canceled
  onCancelInvoiceCreation(): void {
    console.log('Invoice creation canceled'); // Debug log
    this.showCreateInvoice = false; // Hide the form
  }

  // Called when "New Invoice" is clicked
  openCreateInvoiceForm(): void {
    console.log('New Invoice button clicked'); // Debug log
    this.showCreateInvoice = true; // Toggle the form visibility
    console.log('showCreateInvoice:', this.showCreateInvoice); // Debug log
  }
}
