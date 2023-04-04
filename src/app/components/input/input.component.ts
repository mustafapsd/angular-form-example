import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTypes } from 'src/app/interfaces/question.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() value: string = '';
  @Input() label?: string;
  @Input() placeholder?: string = '';
  @Input() type: InputTypes = 'text';

  @Output() change = new EventEmitter<string>();

  onChange: (newValue: string) => void = () => {};
  onTouch: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (newValue: string) => void): void {
    this.onChange = fn;
    this.change.emit(this.value);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
