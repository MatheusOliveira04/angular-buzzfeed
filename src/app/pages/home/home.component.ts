import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { QuestionService } from '../../services/question.service';
import { DataQuestion, Option } from '../../models/question';
import { TitleComponent } from '../../components/title/title.component';
import { QuestionComponent } from '../../components/question/question.component';
import { OptionComponent } from '../../components/option/option.component';
import { AnswerComponent } from '../../components/answer/answer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TitleComponent, QuestionComponent, OptionComponent, AnswerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  data!: DataQuestion;

  index!: number;
  indexLenght: number = 0;

  questionSelected: string = '';
  optionsSelected!: Option[];
  aliasSelected: string[] = [];
  aliasFinal: string = '';

  constructor(questionService: QuestionService) {
    this.data = questionService.getQuestions();
  }

  ngOnInit() {
    this.initializeVariables();
  }

  initializeVariables(): void {
    this.index = -1;
    this.indexLenght = (this.data.questions.length); 
    this.nextQuestion();
    this.questionSelected = this.data.questions[this.index].question;
    this.optionsSelected = this.data.questions[this.index].options; 
  }


  selected(index: number): void {    
    this.getAlias(index);
    this.nextQuestion();
    this.verifyFinalResult();
  }

  private nextQuestion(): void {
    if (this.index < this.indexLenght) {
      this.index++;
      this.questionSelected = this.data.questions[this.index].question;
      this.optionsSelected = this.data.questions[this.index].options;
    } else {
      this.questionSelected = '';
      this.optionsSelected = [];
    }
  }

  getAlias(index: number): void {
    let alias = this.data.questions[this.index].options[index].alias;
    this.aliasSelected.push(alias);
  }

  async calculateResult() {
    let result = this.aliasSelected.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    })
    return result;
  }

  async verifyFinalResult() {        
    if (this.index === this.indexLenght - 1) {
      let getResultProperty: string = await this.calculateResult();
      this.aliasFinal = this.data.results[getResultProperty as keyof typeof this.data.results];
      
    }
  }

  showAnswer(): boolean {
    return this.index === this.indexLenght;
  }

  back(): void {
    this.initializeVariables();
    this.removeAllOfListAliasSelected();
  }

  removeAllOfListAliasSelected(): void {
    this.aliasSelected.splice(0, this.aliasSelected.length);
  }

}
