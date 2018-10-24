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
    for (let i = 0; i < this.anions.length; i++) {
      if (this.answer.anion1 === this.anions[i].symbol) {
        this.answer.anion1Weight = this.anions[i].mass;
        this.answer.anion1Charge = this.anions[i].charge;
      }
    }
    this.answer.cation1 = this.formGroup.get('cation1').value;
    for (let i = 0; i < this.cations.length; i++) {
      if (this.answer.cation1 === this.cations[i].symbol) {
        this.answer.cation1Weight = this.cations[i].mass;
        this.answer.cation1Charge = this.cations[i].charge;
      }
    }
    this.answer.grams1 = this.formGroup.get('grams1').value;
    this.answer.anion2 = this.formGroup.get('anion2').value;
    for (let i = 0; i < this.anions.length; i++) {
      if (this.answer.anion2 === this.anions[i].symbol) {
        this.answer.anion2Weight = this.anions[i].mass;
        this.answer.anion2Charge = this.anions[i].charge;
      }
    }
    this.answer.cation2 = this.formGroup.get('cation2').value;
    for (let i = 0; i < this.cations.length; i++) {
      if (this.answer.cation2 === this.cations[i].symbol) {
        this.answer.cation2Weight = this.cations[i].mass;
        this.answer.cation2Charge = this.cations[i].charge;
      }
    }
    this.answer.grams2 = this.formGroup.get('grams2').value;
    this.answer.reactant1AnionSubscript = (this.answer.cation1Charge === Math.abs(this.answer.anion1Charge)) ?
      '' : this.answer.setSubScript(this.answer.cation1Charge);
    this.answer.reactact1CationSubscript = (this.answer.cation1Charge === Math.abs(this.answer.anion1Charge)) ?
      '' : this.answer.setSubScript(Math.abs(this.answer.anion1Charge));
    this.answer.reactant2AnionSubscript = (this.answer.cation2Charge === Math.abs(this.answer.anion2Charge)) ?
      '' : this.answer.setSubScript(this.answer.cation2Charge);
    this.answer.reactact2CationSubscript = (this.answer.cation2Charge === Math.abs(this.answer.anion2Charge)) ?
      '' : this.answer.setSubScript(Math.abs(this.answer.anion2Charge));
    this.answer.product1AnionSubscript = (this.answer.cation1Charge === Math.abs(this.answer.anion2Charge)) ?
      '' : this.answer.setSubScript(this.answer.cation1Charge);
    this.answer.product1CationSubscript = (this.answer.cation1Charge === Math.abs(this.answer.anion2Charge)) ?
      '' : this.answer.setSubScript(Math.abs(this.answer.anion2Charge));
    this.answer.product2AnionSubscript = (this.answer.cation2Charge === Math.abs(this.answer.anion1Charge)) ?
      '' : this.answer.setSubScript(this.answer.cation2Charge);
    this.answer.product2CationSubscript = (this.answer.cation2Charge === Math.abs(this.answer.anion1Charge)) ?
      '' : this.answer.setSubScript(Math.abs(this.answer.anion1Charge));
    this.answer.calculateFormulaWeight();
    this.answer.setMolecules();
    this.answer.displayKey = true;
    this.answer.stoichiometryGeneration();
    // This method is no longer the right way about it,  Broken most things apart
    // this.answer.molecularNotationGeneration();
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
