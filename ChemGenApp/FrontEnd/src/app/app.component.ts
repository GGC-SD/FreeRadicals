import { Component, OnInit } from '@angular/core';

import { AnswerKey } from './models/answer-key.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Holds data for child components
  private answer: AnswerKey = new AnswerKey();

  ngOnInit() {
    this.answer.anion1 = '';
    this.answer.cation1 = '';
    this.answer.anion2 = '';
    this.answer.cation2 = '';
  }
}
