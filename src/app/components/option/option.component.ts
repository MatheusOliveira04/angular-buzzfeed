import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [],
  templateUrl: './option.component.html',
  styleUrl: './option.component.css'
})
export class OptionComponent {

  @Input() name!:string;
  @Output() selectedEvent = new EventEmitter();

  selected(): void {
    this.selectedEvent.emit(); 
  }

}
