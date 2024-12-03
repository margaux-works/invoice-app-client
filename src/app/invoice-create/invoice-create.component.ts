import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss'],
  providers: [DatePipe],
})
export class InvoiceCreateComponent {
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  invoiceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: FetchApiDataService
  ) {
    this.invoiceForm = this.fb.group({
      senderAddress: this.fb.group({
        street: [''],
        city: [''],
        postCode: [''],
        country: [''],
      }),
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientAddress: this.fb.group({
        street: [''],
        city: [''],
        postCode: [''],
        country: [''],
      }),
      createdAt: [new Date().toISOString().split('T')[0], Validators.required],
      paymentTerms: [30, Validators.required],
      description: ['', Validators.required],
      items: this.fb.array([]),
      total: [{ value: 0, disabled: true }],
    });
  }

  ngOnInit(): void {}

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem() {
    const itemGroup = this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }],
    });
    this.items.push(itemGroup);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.updateTotal();
  }

  calculateTotal(index: number) {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    item.get('total')?.setValue(quantity * price);
    this.updateTotal();
  }

  updateTotal() {
    const total = this.items.controls.reduce((sum, item) => {
      return sum + (item.get('total')?.value || 0);
    }, 0);
    this.invoiceForm.get('total')?.setValue(total);
  }

  saveAsDraft() {
    const payload = this.invoiceForm.getRawValue();
    payload.status = 'draft';
    if (!payload.id) {
      payload.id = this.generateInvoiceId();
    }
    this.apiService.createInvoice(payload).subscribe({
      next: () => this.save.emit(),
      error: (err) => console.error('Failed to save draft:', err),
    });
  }

  submitInvoice() {
    if (this.invoiceForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const payload = this.invoiceForm.getRawValue();
    payload.status = 'pending';
    payload.id = this.generateInvoiceId();
    payload.paymentDue = this.calculatePaymentDue(
      payload.createdAt,
      payload.paymentTerms
    );

    this.apiService.createInvoice(payload).subscribe({
      next: () => this.save.emit(),
      error: (err) => console.error('Failed to save invoice:', err),
    });
  }

  cancelCreation() {
    this.cancel.emit();
  }
  generateInvoiceId(): string {
    const letters = Array(2)
      .fill('')
      .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
      .join('');
    const numbers = Math.floor(1000 + Math.random() * 9000);
    return `${letters}${numbers}`;
  }

  calculatePaymentDue(createdAt: string, paymentTerms: number): string {
    const createdDate = new Date(createdAt);
    createdDate.setDate(createdDate.getDate() + paymentTerms);
    return createdDate.toISOString().split('T')[0];
  }
}
