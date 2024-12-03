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

@Component({
  selector: 'app-invoice-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss'],
})
export class InvoiceCreateComponent {
  @Output() create = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      senderAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      clientAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      createdAt: [new Date()],
      paymentTerms: [0, Validators.required],
      description: ['', Validators.required],
      items: this.fb.array([this.createItemGroup()]),
      total: [0],
      status: ['draft'],
    });
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  createItemGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }],
    });
  }

  addItem(): void {
    this.items.push(this.createItemGroup());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  calculateTotal(): number {
    return this.items.controls.reduce((total, item) => {
      const quantity = item.get('quantity')?.value || 0;
      const price = item.get('price')?.value || 0;
      return total + quantity * price;
    }, 0);
  }

  generateId(): string {
    const letters = Array.from({ length: 2 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
    const numbers = Math.floor(1000 + Math.random() * 9000).toString();
    return letters + numbers;
  }

  submitInvoice(): void {
    if (this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      return;
    }

    const formValue = this.invoiceForm.getRawValue();
    formValue.id = this.generateId();

    if (formValue.status === '') {
      formValue.status = 'pending';
    }

    this.create.emit(formValue);
  }

  saveAsDraft(): void {
    const formValue = this.invoiceForm.getRawValue();
    formValue.id = this.generateId();
    formValue.status = 'draft';
    this.create.emit(formValue);
  }

  cancelCreation(): void {
    console.log('Invoice Creation Canceled');
    this.canceled.emit();
  }
}
