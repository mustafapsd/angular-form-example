import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { RouterModule } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { InputModule } from 'src/app/components/input/input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormStoreService } from '../services/form-store.service';
import { QuestionModule } from '../components/question/question.module';
import { FormReviewComponent } from './form-review/form-review.component';
import { AnswerModule } from '../components/answer/answer.module';

@NgModule({
  declarations: [FormComponent, FormBuilderComponent, FormReviewComponent],
  imports: [
    CommonModule,
    InputModule,
    FormsModule,
    AnswerModule,
    ReactiveFormsModule,
    QuestionModule,
    RouterModule.forChild([
      {
        path: 'builder',
        component: FormComponent,
      },
      {
        path: 'answers',
        component: FormReviewComponent,
      },
      {
        path: '',
        redirectTo: 'builder',
        pathMatch: 'full',
      },
    ]),
  ],
  providers: [FormStoreService],
})
export class FormModule {}
