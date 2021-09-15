import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Journey } from './journey.model';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent implements OnInit {

  @Input() journey: Journey | null = null;
  @Output() edit = new EventEmitter<Journey>();

  constructor() { }

  ngOnInit() {
  }

}
