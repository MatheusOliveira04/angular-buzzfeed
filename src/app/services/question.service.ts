import { Injectable } from '@angular/core';

import { DataQuestion, Option } from '../models/question';
import { buzzfeed } from '../../assets/data/quiz-questions.json';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private dataQuestion!: DataQuestion;

  constructor() {
    this.dataQuestion = {
      title: buzzfeed.title,
      questions: buzzfeed.questions,
      results: buzzfeed.results
    };
   }

  getQuestions(): DataQuestion {
    return this.dataQuestion;
  }
}
