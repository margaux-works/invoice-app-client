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

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {}

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

  saveChanges(): void {
    if (this.invoiceForm.valid) {
      console.log('Form data to save:', this.invoiceForm.getRawValue());
      this.save.emit(this.invoiceForm.getRawValue());
    } else {
      console.error('Form is invalid:', this.invoiceForm);
    }
  }

  cancelEdit(): void {
    this.cancel.emit();
  }
}
