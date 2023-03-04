import { Component } from '@angular/core';
import { FormStoreService } from 'src/app/services/form-store.service';

@Component({
  selector: 'app-form-review',
  templateUrl: './form-review.component.html',
  styleUrls: ['./form-review.component.scss'],
})
export class FormReviewComponent {
  constructor(public store: FormStoreService) {}
}
