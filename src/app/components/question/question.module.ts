import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { FormsModule } from '@angular/forms';
import { InputModule } from '../input/input.module';

@NgModule({
  declarations: [QuestionComponent],
  imports: [CommonModule, FormsModule, InputModule],
  exports: [QuestionComponent],
})
export class QuestionModule {}
