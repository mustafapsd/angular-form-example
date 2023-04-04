import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Answer } from 'src/app/interfaces/answer.interface';
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
    this.store.questions$.subscribe((questions) => {
      this.questions = this.formBuilder.group(
        {
          questions: this.formBuilder.array([]),
        },
        { validators: this.checkFormIsValid }
      );

      questions.forEach((question) => {
        this.questionsArray.push(
          this.formBuilder.group({
            answer: [
              {
                answer: '',
                checkedOptions: [],
              },
            ],
            required: [question.required],
          })
        );
      });
    });
  }

  get questionsArray() {
    return (
      (this.questions?.controls['questions'] as FormArray<FormGroup>) || []
    );
  }

  checkFormIsValid: () => { [key: string]: any } | null = () => {
    const VALID = this.questionsArray?.controls?.every(
      (questionForm, index: number) => {
        const question = questionForm.value.answer;
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
      },
      true
    );

    if (VALID) {
      return null;
    } else {
      return { invalid: true };
    }
  };

  submit() {
    this.store.clearAnswers();
    console.log(this.questions.value);
    this.questions.value.questions.forEach(
      (
        question: {
          answer: {
            answer: string;
            checkedOptions: string[];
          };
        },
        index: number
      ) => {
        const QUESTION = this.store.questions$.value[index];

        const ANSWER = new Answer(QUESTION);

        ANSWER.answer = question.answer.answer;
        ANSWER.checkedOptions = question.answer.checkedOptions;

        this.store.addAnswer(ANSWER);
      }
    );

    this.router.navigate(['/form/answers']);
  }
}
