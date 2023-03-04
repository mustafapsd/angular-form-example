export class Question {
  type: 'checkbox' | 'text' = 'text';
  question: string = '';
  required: boolean = false;
  options?: string[];
  allowOther?: boolean;
}
