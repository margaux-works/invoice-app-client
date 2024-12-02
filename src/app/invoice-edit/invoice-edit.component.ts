import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-invoice-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invoice-edit.component.html',
  styleUrl: './invoice-edit.component.scss',
})
export class InvoiceEditComponent {
  @Input() invoice: any;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      clientName: ['', Validators.required],
      paymentTerms: [30, Validators.required],
      items: this.fb.array([]),
      total: [0],
    });
  }

  ngOnChanges(): void {
    if (this.invoice) {
      this.invoiceForm.patchValue(this.invoice);
    }
  }

  saveChanges(): void {
    if (this.invoiceForm.valid) {
      this.save.emit(this.invoiceForm.value);
    }
  }
}
