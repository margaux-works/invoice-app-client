import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FetchApiDataService } from '../services/fetch-api-data.service';

@Component({
  selector: 'app-invoice-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './invoice-edit.component.html',
  styleUrl: './invoice-edit.component.scss',
  providers: [DatePipe],
})
export class InvoiceEditComponent {
  @Input() invoice: any;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  invoiceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private apiService: FetchApiDataService
  ) {}

  ngOnInit(): void {
    const formattedDate = this.datePipe.transform(
      this.invoice.createdAt,
      'd MMM y'
    );
    this.invoice.createdAt = formattedDate; // Format the date
    this.initializeForm();
  }

  initializeForm(): void {
    console.log('Invoice data', this.invoice);

    const itemsArray = this.createItemsArray(this.invoice.items || []);

    this.invoiceForm = this.fb.group({
      senderAddress: this.fb.group({
        street: [this.invoice.senderAddress.street || ''],
        city: [this.invoice.senderAddress.city || ''],
        postCode: [
          this.invoice.senderAddress.postCode || '',
          Validators.required,
        ],
        country: [this.invoice.senderAddress.country, Validators.required],
      }),
      clientAddress: this.fb.group({
        street: [this.invoice.clientAddress.street, Validators.required],
        city: [this.invoice.clientAddress.city, Validators.required],
        postCode: [this.invoice.clientAddress.postCode, Validators.required],
        country: [this.invoice.clientAddress.country, Validators.required],
      }),
      clientName: [this.invoice.clientName, Validators.required],
      clientEmail: [
        this.invoice.clientEmail,
        [Validators.required, Validators.email],
      ],
      description: [this.invoice.description, Validators.required],
      paymentTerms: [this.invoice.paymentTerms, Validators.required],
      createdAt: [{ value: this.invoice.createdAt || '', disabled: true }],
      total: [this.invoice.total, [Validators.required, Validators.min(0)]],
      items: this.fb.array(itemsArray),
    });
    console.log('Initialized FormArray:', this.invoiceForm.get('items'));
  }

  createItemsArray(items: any[]): FormGroup[] {
    if (!Array.isArray(items)) {
      console.error('Items is not an array:', items);
      return [];
    }

    return items.map((item) => {
      console.log('Creating FormGroup for item:', item);
      return this.fb.group({
        name: [item.name || '', Validators.required],
        quantity: [
          item.quantity || 0,
          [Validators.required, Validators.min(1)],
        ],
        price: [item.price || 0, [Validators.required, Validators.min(0)]],
        total: [
          { value: item.quantity * item.price || 0, disabled: true },
          Validators.required,
        ],
      });
    });
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    const itemGroup = this.fb.group({
      name: [''],
      quantity: [0],
      price: [0],
      total: [{ value: 0, disabled: true }],
    });

    // Calculate total whenever quantity or price changes
    itemGroup.get('quantity')?.valueChanges.subscribe(() => {
      this.updateItemTotal(itemGroup);
    });
    itemGroup.get('price')?.valueChanges.subscribe(() => {
      this.updateItemTotal(itemGroup);
    });

    this.items.push(itemGroup);
  }

  updateItemTotal(item: FormGroup): void {
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    const total = quantity * price;
    item.get('total')?.setValue(total, { emitEvent: false });
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  saveChanges(): void {
    const updatedItems = this.invoiceForm.value.items;

    // Calculate new total
    const updatedTotal = updatedItems.reduce(
      (sum: number, item: { quantity: number; price: number }) =>
        sum + item.quantity * item.price,
      0
    );

    const updatedInvoice = {
      ...this.invoiceForm.value,
      total: updatedTotal, // Ensure total is included
    };

    // Update the invoice in the database
    this.apiService.updateInvoice(this.invoice.id, updatedInvoice).subscribe({
      next: () => {
        this.save.emit(updatedInvoice); // Emit saved changes to parent
      },
      error: (err) => {
        console.error('Error updating invoice:', err);
      },
    });
  }

  cancelEdit(): void {
    this.cancel.emit();
  }
}
