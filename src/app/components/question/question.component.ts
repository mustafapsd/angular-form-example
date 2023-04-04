import {
  Component,
  forwardRef,
  Input
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Question } from 'src/app/interfaces/question.interface';

type ChangeEvent = (val: { answer: string; checkedOptions: string[] }) => void;
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuestionComponent),
      multi: true,
    },
  ],
})
export class QuestionComponent implements ControlValueAccessor {
  @Input() question: Question;

  questionAnswer: {
    answer: string;
    checkedOptions: string[];
  };

  otherSelected = false;

  onChange: ChangeEvent = () => {};

  checkAnswer(event: Event) {
    const target = event.target as HTMLInputElement;

    const answer = this.questionAnswer.checkedOptions;

    if (target.checked) {
      answer.push(target.value);
    } else {
      const index = answer.indexOf(target.value);
      answer.splice(index, 1);
    }

    this.questionAnswer.checkedOptions = answer;

    this.onChange(this.questionAnswer);
  }

  changedAnswer() {
    this.onChange(this.questionAnswer);
  }

  writeValue(answer: { answer: string; checkedOptions: string[] }): void {
    this.questionAnswer = answer;
  }

  registerOnChange(fn: ChangeEvent): void {
    this.onChange = fn;
  }

  registerOnTouched(_fn: any): void {
    return;
  }
}
