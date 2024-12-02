import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './invoice-view.component.html',
  styleUrl: './invoice-view.component.scss',
})
export class InvoiceViewComponent {
  @Input() invoice: any;
  @Output() edit = new EventEmitter<void>();
  @Output() markAsPaid = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor() {}
}
