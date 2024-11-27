import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  imports: [CommonModule],
})
export class ToastComponent implements OnInit {
  toastMessage: string = '';
  showToast: boolean = false;

  constructor(public toastService: ToastService) {}

  ngOnInit(): void {
    // Subscribe to the observable and specify the type for message
    this.toastService.toastMessage$.subscribe((message: string) => {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    });
  }
}
