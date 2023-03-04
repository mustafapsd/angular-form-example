import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Answer } from '../interfaces/answer.interface';
import { Question } from '../interfaces/question.interface';

@Injectable()
export class FormStoreService {
  readonly questions$: BehaviorSubject<Question[]> = new BehaviorSubject<
    Question[]
  >([]);

  readonly answers$: BehaviorSubject<Answer[]> = new BehaviorSubject<Answer[]>(
    []
  );

  constructor() {}

  addQuestion(question: Question) {
    this.questions$.next([...this.questions$.value, question]);
  }

  addAnswer(answer: Answer) {
    this.answers$.next([...this.answers$.value, answer]);
  }

  clearAnswers() {
    this.answers$.next([]);
  }
}
