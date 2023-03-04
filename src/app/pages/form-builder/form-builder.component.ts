import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormStoreService } from 'src/app/services/form-store.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements AfterViewInit {
  @Output() questionAdded = new EventEmitter<void>();

  questionForm: FormGroup = this.formBuilder.group({
    type: ['text', [Validators.required]],
    question: ['', [Validators.required]],
    required: [false],
    allowOther: [false],
    options: this.formBuilder.array([], [this.optionsValidator()]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private formStore: FormStoreService
  ) {}

  ngAfterViewInit(): void {
    this.questionForm.valueChanges.subscribe(() => {
      if (this.questionForm.controls['type'].value === 'text') {
        this.questionForm.setErrors(null);
      }
    });
  }

  optionsValidator(): ValidatorFn {
    return ((control: FormGroup) => {
      const options = control.value;
      const isCheckbox = this.questionForm?.get('type')?.value === 'checkbox';

      if (!isCheckbox) {
        return null;
      }

      if ((!options || options?.length === 0) && isCheckbox) {
        return { options: true };
      }

      return options?.every((option: string) => option)
        ? null
        : { options: true };
    }) as ValidatorFn;
  }

  addOption() {
    const options = this.questionForm.controls['options'] as FormArray;

    options.push(this.formBuilder.control(''));
  }

  removeOption(index: number) {
    const options = this.questionForm.controls['options'] as FormArray;

    options.removeAt(index);
  }

  addQuestion() {
    this.formStore.addQuestion(this.questionForm.value);
    this.questionAdded.emit();
  }
}
