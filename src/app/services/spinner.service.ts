import { Injectable } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  spinnerCount = 0;

  constructor(
    private ngxSpinner: NgxSpinnerService,
  ) { }

  show() {
    if (this.spinnerCount === 0) {
      this.ngxSpinner.show();
    }
    this.spinnerCount += 1;
  }

  hide() {
    this.spinnerCount -= 1;

    if (this.spinnerCount <= 0) {
      this.ngxSpinner.hide();
      this.spinnerCount = 0;
    }
  }
}
