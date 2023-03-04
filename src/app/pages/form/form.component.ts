import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Answer } from 'src/app/interfaces/answer.interface';
import { Question } from 'src/app/interfaces/question.interface';
import { FormStoreService } from 'src/app/services/form-store.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  showForm = false;

  questions: FormGroup;

  constructor(
    public store: FormStoreService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questions = this.formBuilder.group({
      questions: this.formBuilder.array([]),
    });

    this.store.questions$.subscribe((questions) => {
      this.questions.controls['questions'] = this.formBuilder.array(
        questions.map((question) => {
          return this.formBuilder.group({
            answer: [''],
            checkedOptions: this.formBuilder.array([]),
            required: [question.required],
          });
        })
      );

      setTimeout(() => {
        this.checkFormIsValid();
      }, 200);
    });
  }

  checkFormIsValid() {
    const VALID = (
      this.questions.controls['questions'].value as {
        answer: string;
        checkedOptions: string[];
      }[]
    ).every((question, index: number) => {
      const QUESTION = this.store.questions$.value[index];

      if (!QUESTION.required) {
        return true;
      }

      const isCheckbox = QUESTION.type === 'checkbox';

      if (isCheckbox) {
        const allowOthers = QUESTION.allowOther;

        const isValid = allowOthers
          ? question.checkedOptions.length > 0 || question.answer.length > 0
          : question.checkedOptions.length > 0;

        if (!isValid) {
          return false;
        }
      }

      if (!isCheckbox) {
        if (question.answer.length === 0) {
          return false;
        }
      }

      return true;
    }, true);

    if (VALID) {
      this.questions.setErrors(null);
    } else {
      this.questions.setErrors({ invalid: true });
    }
  }

  submit() {
    this.store.clearAnswers();

    this.questions.value.questions.forEach(
      (
        question: {
          answer: string;
          checkedOptions: string[];
        },
        index: number
      ) => {
        const QUESTION = this.store.questions$.value[index];

        const ANSWER = new Answer(QUESTION);

        ANSWER.answer = question.answer;
        ANSWER.checkedOptions = question.checkedOptions;

        this.store.addAnswer(ANSWER);
      }
    );

    this.router.navigate(['/form/answers']);
  }
}
