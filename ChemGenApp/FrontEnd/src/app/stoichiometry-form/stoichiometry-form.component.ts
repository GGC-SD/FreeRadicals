import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { AnswerKey } from '../models/answer-key.model';
import { ElementsService } from '../services/elements.service';

@Component({
  selector: 'app-stoichiometry-form',
  templateUrl: './stoichiometry-form.component.html',
  styleUrls: ['./stoichiometry-form.component.scss']
})
export class StoichiometryFormComponent implements OnInit {

  // @Input needed so answer can be seen by both components
  @Input() private answer: AnswerKey;

  // Declares form group attached to form
  private formGroup: FormGroup = new FormGroup({
    cation1: new FormControl(),
    anion1: new FormControl(),
    grams1: new FormControl(),
    cation2: new FormControl(),
    anion2: new FormControl(),
    grams2: new FormControl()
  });

  private anions: any = [];
  private cations: any = [];

  constructor(private formBuilder: FormBuilder, private elements: ElementsService) {
    this.createForm();
   }

  ngOnInit() {
    this.elements.getAnions().subscribe(anions => {
      this.anions = anions;
    });
    this.elements.getCations().subscribe(cations => {
      this.cations = cations;
    });
  }

  // Gets the form input and sets the answer key properties
  private setAnswerKey(): void {
    this.answer.anion1 = this.formGroup.get('anion1').value;
    this.answer.cation1 = this.formGroup.get('cation1').value;
    this.answer.grams1 = this.formGroup.get('grams1').value;
    this.answer.anion2 = this.formGroup.get('anion2').value;
    this.answer.cation2 = this.formGroup.get('cation2').value;
    this.answer.grams2 = this.formGroup.get('grams2').value;
    this.answer.stoichiometryGeneration();
    this.answer.displayKey = true;
    this.answer.molecularNotationGeneration();
  }

  // Creates the form and sets default prioperties
  private createForm(): void {
    this.formGroup = this.formBuilder.group({
      cation1: ['Li'],
      anion1: ['Br'],
      grams1: '',
      cation2: ['Na'],
      anion2: ['I'],
      grams2: ''
    });
  }
}
