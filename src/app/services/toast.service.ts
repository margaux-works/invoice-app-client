import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: { message: string }[] = [];

  // Create a BehaviorSubject to emit toast messages
  private toastMessageSubject = new BehaviorSubject<string>(''); // initial value is an empty string
  toastMessage$ = this.toastMessageSubject.asObservable(); // expose it as an observable

  showToast(message: string): void {
    this.toasts.push({ message });
    this.toastMessageSubject.next(message); // Emit the toast message
    setTimeout(() => {
      this.toasts.shift();
    }, 3000); // Toast disappears after 3 seconds
  }

  getToasts(): { message: string }[] {
    return this.toasts;
  }
}
