import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchApiDataService } from '../services/fetch-api-data.service';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss',
})
export class InvoiceDetailsComponent {
  constructor(private fetchApiData: FetchApiDataService) {}
}
