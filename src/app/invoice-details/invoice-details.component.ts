import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InvoiceViewComponent } from '../invoice-view/invoice-view.component';
import { InvoiceEditComponent } from '../invoice-edit/invoice-edit.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-invoice-details',
  imports: [CommonModule, InvoiceViewComponent, InvoiceEditComponent],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss',
})
export class InvoiceDetailsComponent implements OnInit {
  invoice: any;
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: FetchApiDataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getInvoiceById(id).subscribe((data) => {
        this.invoice = data;
      });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  markAsPaid(): void {
    if (this.invoice) {
      this.apiService.markInvoiceAsPaid(this.invoice.id).subscribe({
        next: (response) => {
          console.log(`Invoice marked as paid:`, response);
          this.invoice.status = 'paid'; // Update UI state
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to mark invoice as paid:', err.message);
          alert('Failed to mark invoice as paid. Please try again.');
        },
      });
    }
  }

  deleteInvoice(): void {
    if (this.invoice) {
      this.apiService.deleteInvoice(this.invoice.id).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

  saveChanges(updatedInvoice: any): void {
    this.apiService
      .updateInvoice(this.invoice.id, updatedInvoice)
      .subscribe(() => {
        this.invoice = { ...this.invoice, ...updatedInvoice };
        this.isEditing = false;
      });
  }
}
