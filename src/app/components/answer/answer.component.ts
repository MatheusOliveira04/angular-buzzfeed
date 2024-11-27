import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css'
})
export class AnswerComponent {

  @Input() aliasFinal: string = '';

  @Output() backEvent = new EventEmitter();

  back() {
    this.backEvent.emit();
  }

}
