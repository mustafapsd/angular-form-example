import { Question } from './question.interface';

export class Answer {
  question: Question;
  answer: string;
  checkedOptions: string[] = [];

  constructor(question: Question) {
    this.question = question;
    this.answer = '';
  }
}
