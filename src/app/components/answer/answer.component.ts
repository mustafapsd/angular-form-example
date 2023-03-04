import { Component, Input } from '@angular/core';
import { Answer } from 'src/app/interfaces/answer.interface';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent {
  @Input() answer: Answer;
}
