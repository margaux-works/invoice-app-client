import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InvoiceViewComponent } from '../invoice-view/invoice-view.component';
import { InvoiceEditComponent } from '../invoice-edit/invoice-edit.component';
import { ChangeDetectorRef } from '@angular/core';

// pdf library
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);

@Component({
  selector: 'app-invoice-details',
  imports: [CommonModule, InvoiceViewComponent, InvoiceEditComponent],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss',
})
export class InvoiceDetailsComponent implements OnInit {
  invoice: any;
  isEditing: boolean = false;
  showDeleteConfirmation = false;

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

  // show modal
  deleteInvoice() {
    this.showDeleteConfirmation = true;
  }

  // confirm deletion
  confirmDelete(): void {
    if (this.invoice) {
      this.apiService.deleteInvoice(this.invoice.id).subscribe(() => {
        console.log(`Deleting invoice: ${this.invoice.id}`);
        this.router.navigate(['/dashboard']);
        this.showDeleteConfirmation = false;
      });
    }
  }

  // cancel deletion
  cancelDelete() {
    this.showDeleteConfirmation = false;
  }

  saveChanges(updatedInvoice: any): void {
    this.apiService
      .updateInvoice(this.invoice.id, updatedInvoice)
      .subscribe(() => {
        this.invoice = { ...this.invoice, ...updatedInvoice };
        this.isEditing = false;
      });
  }

  generatePDF(): void {
    if (!this.invoice) {
      return;
    }

    const currentDate = new Date().toLocaleDateString();
    // Format the payment due date
    const paymentDueDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(this.invoice.paymentDue));

    const docDefinition: TDocumentDefinitions = {
      content: [
        // Header Section
        {
          columns: [
            {
              text: `Invoice #${this.invoice.id}`,
              style: 'header',
            },
            {
              text: [
                { text: 'Sender Address:\n', style: 'subheader' },
                `${this.invoice.senderAddress.street}\n`,
                `${this.invoice.senderAddress.city}, ${this.invoice.senderAddress.postCode}\n`,
                `${this.invoice.senderAddress.country}`,
              ],
              alignment: 'right',
            },
          ],
        },
        { text: `Date: ${currentDate}`, margin: [0, 10, 0, 5] },
        { text: `Client: ${this.invoice.clientName}`, margin: [0, 5, 0, 5] },
        {
          text: `Address: ${this.invoice.clientAddress.street}`,
          margin: [0, 0, 0, 5],
        },
        {
          text: `${this.invoice.clientAddress.city}, ${this.invoice.clientAddress.postCode}, ${this.invoice.clientAddress.country}`,
          margin: [0, 0, 0, 10],
        },

        // Table Section for Items
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Item Name', 'Quantity', 'Price', 'Total'], // Table Header
              ...this.invoice.items.map((item: any) => [
                item.name,
                item.quantity,
                `$${item.price}`,
                `$${item.total}`,
              ]),
            ],
          },
          layout: 'lightHorizontalLines',
          margin: [0, 10, 0, 20],
        },

        // Total Amount
        {
          text: `Total: $${this.invoice.total}`,
          style: 'total',
          margin: [0, 20, 0, 20],
        },

        // Payment Due Date Section
        {
          text: [{ text: 'Payment Due Date: ', bold: true }, paymentDueDate],
          margin: [0, 20, 0, 5],
        },
        {
          text: 'Please ensure payment is made by the due date to avoid penalties.',
          italics: true,
          margin: [0, 0, 0, 10],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 12,
          bold: true,
        },
        total: {
          fontSize: 16,
          bold: true,
          alignment: 'right',
        },
      },
      defaultStyle: {
        fontSize: 10,
      },
    };

    pdfMake.createPdf(docDefinition).download(`Invoice_${this.invoice.id}.pdf`);
  }
}
