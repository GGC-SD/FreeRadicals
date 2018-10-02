import { Component, OnInit, Input } from '@angular/core';

import { AnswerKey } from '../models/answer-key.model';

@Component({
  selector: 'app-stoichiometry-form',
  templateUrl: './stoichiometry-form.component.html',
  styleUrls: ['./stoichiometry-form.component.scss']
})
export class StoichiometryFormComponent implements OnInit {

  // @Input needed so answer can be seen by both components
  @Input()
  private answer: AnswerKey;

  constructor() { }

  ngOnInit() {
  }

  private setAnswerKey(): void {
  }
}
