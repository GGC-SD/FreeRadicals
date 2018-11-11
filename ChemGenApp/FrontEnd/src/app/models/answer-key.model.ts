// Answer key to be used to hold the data inputed by the professors
// and the answers calculated by the application
export class AnswerKey {
  
  // Whether or not the output is displayed
  public displayKey: boolean;

  // Whether or not to get the solubility data
  // This is to avoid trying to calculate using empty objects
  public findSolubility: boolean;

  // Inputted data
  // Reactant 1
  public anion1: String;
  public cation1: String;
  public grams1: number;

  // Reactant 2
  public anion2: String;
  public cation2: String;
  public grams2: number;

  // Calculated Data
  public cation1Weight: number;
  public anion1Weight: number;
  public cation2Weight: number;
  public anion2Weight: number;

  // Charges of Ions
  public cation1Charge: number;
  public anion1Charge: number;
  public cation2Charge: number;
  public anion2Charge: number;

  // Coalesced Molecular data (includes substrings, but not the solubility)
  public reactant1: String;
  public reactant2: String;
  public product1: String;
  public product2: String;

  // Reactant Subscripts
  public reactant1AnionSubscript: number;
  public reactant1CationSubscript: number;
  public reactant2AnionSubscript: number;
  public reactant2CationSubscript: number;
  
  // Product Subscripts
  public product1AnionSubscript: number;
  public product1CationSubscript: number;
  public product2AnionSubscript: number;
  public product2CationSubscript: number;
  
  // Reactant Coefficients
  public reactant1Coefficient: number;
  public reactant2Coefficient: number;

  // Product Coefficients
  public product1Coefficient: number;
  public product2Coefficient: number;

  // Formula Weights (Molar Mass)
  // Reactants
  public reactant1Weight: number;
  public reactant2Weight: number;

  // Products
  public product1Weight: number;
  public product2Weight: number;

  // Mole Ratios of Products to Reactants
  public moleRatioP1toR1: number;
  public moleRatioP1toR2: number;
  public moleRatioP2toR1: number;
  public moleRatioP2toR2: number;

  // Reactant Mole Ratios, used in calculations and displayed.
  public moleRatioR1toR2: number;
  public moleRatioR2toR1: number;

  // The limiting reactant of the reaction.  This is displayed and determines which numbers in other parts are displayed.
  public limitingReactant: String;
  public nonLimitingReactant: String;

  // Yield, based on limiting reactant
  public yieldProduct1: number;
  public yieldProduct2: number;

  // Grams, dependent on limiting reactant
  public gramsUsed: number;
  public gramsRemaining: number;

  // Sum of all remaining masses
  public sumOfAll: number;

  // This is the moles of each item.  This is displayed and used in calculations.
  // Reactants
  public molesReactant1: number;
  public molesReactant2: number;
  
  // Products
  public molesP1FromR1: number;
  public molesP2FromR1: number;
  public molesP1FromR2: number;
  public molesP2FromR2: number;

  // Solubility data input
  public cation1SolubilityData: any [];
  public cation2SolubilityData: any [];

  // Actual saved solubility data, used for output onto the html
  public reactant1Solubility: String;
  public reactant2Solubility: String;
  public product1Solubility: String;
  public product2Solubility: String;

  // Runs at the beginning (obviously)
  constructor() {

    // Make sure the display is off by default
    this.displayKey = false;

    // Display the solubility when loaded by default
    this.findSolubility = true;

    // Default the Coefficients to 1
    this.reactant1Coefficient = 1;
    this.reactant2Coefficient = 1;
    this.product1Coefficient = 1;
    this.product2Coefficient = 1;
  }

  // Sets the subscripts of the elements
  public setSubScript(subscript: number): String {
    switch (subscript) {
      case 1: // if the subscript is 1
        return ''; // send back a blank field
      case 2: // if the subscript is 2
        return '\u2082'; // send back the unicode for subscript 2
      case 3: // if the subscript is 3
        return '\u2083'; // send back the unicode for subscript 3
      default: // otherwise
        return '!!!!! ERROR: SUBSCRIPT VALUE NOT HANDLED !!!!!'; // send back an error so that we can add more cases (potentially)
    }
  }

  // Groups the cations, anions, and subscripts to create the molecules as a string
  public setMolecules(): void {

    this.reactant1 = '' + this.cation1 + this.setSubScript(this.reactant1CationSubscript) + this.anion1 +
      this.setSubScript(this.reactant1AnionSubscript);
    
    this.reactant2 = '' + this.cation2 + this.setSubScript(this.reactant2CationSubscript) + this.anion2 +
      this.setSubScript(this.reactant2AnionSubscript);
    
    this.product1 = '' + this.cation1 + this.setSubScript(this.product1CationSubscript) + this.anion2 +
      this.setSubScript(this.product1AnionSubscript);

    this.product2 = '' + this.cation2 + this.setSubScript(this.product2CationSubscript) + this.anion1 +
      this.setSubScript(this.product2AnionSubscript);
  }

  // Calulates formula weights based on charges of opposite bonded element
  public calculateFormulaWeight(): void {
    
    this.product1Weight = (this.cation1Weight * this.product1CationSubscript) +
      (this.anion2Weight * this.product1AnionSubscript);

    this.product2Weight = (this.cation2Weight * this.product2CationSubscript) +
      (this.anion1Weight * this.product2AnionSubscript);

    this.reactant1Weight = (this.anion1Weight * this.reactant1AnionSubscript) + 
      (this.cation1Weight * this.reactant1CationSubscript);

    this.reactant2Weight = (this.anion2Weight * this.reactant2AnionSubscript) + 
      (this.cation2Weight * this.reactant2CationSubscript);
  }

  // Determnes the subscript based on opposing charges
  public determineSubscript(): void {
    
    this.reactant1AnionSubscript = (this.cation1Charge === Math.abs(this.anion1Charge)) ?
      1 : this.cation1Charge;

    this.reactant1CationSubscript = (this.cation1Charge === Math.abs(this.anion1Charge)) ?
      1 : Math.abs(this.anion1Charge);

    this.reactant2AnionSubscript = (this.cation2Charge === Math.abs(this.anion2Charge)) ?
      1 : this.cation2Charge;

    this.reactant2CationSubscript = (this.cation2Charge === Math.abs(this.anion2Charge)) ?
      1 : Math.abs(this.anion2Charge);

    this.product1AnionSubscript = (this.cation1Charge === Math.abs(this.anion2Charge)) ?
      1 : this.cation1Charge;

    this.product1CationSubscript = (this.cation1Charge === Math.abs(this.anion2Charge)) ?
      1 : Math.abs(this.anion2Charge);

    this.product2AnionSubscript = (this.cation2Charge === Math.abs(this.anion1Charge)) ?
      1 : this.cation2Charge;

    this.product2CationSubscript = (this.cation2Charge === Math.abs(this.anion1Charge)) ?
      1 : Math.abs(this.anion1Charge);
  }

  // Balances equation based on subscripts and default coefficients
  public balanceEquation(): void {
    
    /* Debug, add/remove the * / here to enable/disable the code -> */
    console.log("The following data is printed for debug purposes, please disable this block in answer-key.model.ts if you are not debugging the system.");
    console.log("Began Balance Equation");
    /* */

    // Determines the amount of cations and anions in each molecule based on subscript and coefficient
    // This keeps track of how many there are in each molecule, and checks that they all are the same.
    let reactant1CationAmount: number = this.reactant1CationSubscript * this.reactant1Coefficient;
    let product1CationAmount: number = this.product1CationSubscript * this.product1Coefficient;
    let reactant1AnionAmount: number = this.reactant1AnionSubscript * this.reactant1Coefficient;
    let product1AnionAmount: number = this.product1AnionSubscript * this.product1Coefficient;
    let reactant2CationAmount: number = this.reactant2CationSubscript * this.reactant2Coefficient;
    let product2CationAmount: number = this.product2CationSubscript * this.product2Coefficient;
    let reactant2AnionAmount: number = this.reactant2AnionSubscript * this.reactant2Coefficient;
    let product2AnionAmount: number = this.product2AnionSubscript * this.product2Coefficient;

    /* Debug, add/remove the * / here to enable/disable the code -> */
    console.log("The following data is printed for debug purposes, please disable this block in answer-key.model.ts if you are not debugging the system.");
    console.log("Finished assigning variables and beginning while loop");
    let x: number = 0;
    /* */

    // While loops tests that the amounts on either side of the equation are equal
    while (
      reactant1CationAmount !== product1CationAmount ||
      reactant1AnionAmount !== product2AnionAmount ||
      reactant2CationAmount !== product2CationAmount || 
      reactant2AnionAmount !== product1AnionAmount
    ) {

      /* Debug, add/remove the * / here to enable/disable the code -> */
      console.log("The following data is printed for debug purposes, please disable this block in answer-key.model.ts if you are not debugging the system.");
      x++;
      console.log("Beginning loop itteration " + x);
      console.log("Stored Data: ");
      console.log("reactant1CationAmount: " + reactant1CationAmount);
      console.log("product1CationAmount: " + product1CationAmount);
      console.log("reactant2CationAmount: " + reactant2CationAmount);
      console.log("product2CationAmount: " + product2CationAmount);
      console.log("reactant1AnionAmount: " + reactant1AnionAmount);
      console.log("product1AnionAmount: " + product1AnionAmount);
      console.log("reactant2AnionAmount: " + reactant2AnionAmount);
      console.log("product2AnionAmount: " + product2AnionAmount);
      /* */

      // Tests if cation amounts are the same
      if (reactant1CationAmount !== product1CationAmount) {

        // If not the same test which is bigger and increase the appropriate coefficient
        if (reactant1CationAmount > product1CationAmount) {
          this.product1Coefficient *= reactant1CationAmount / product1CationAmount;
          product1CationAmount = this.product1CationSubscript * this.product1Coefficient;
          product1AnionAmount = this.product1AnionSubscript * this.product1Coefficient;
        } else {
          this.reactant1Coefficient *= product1CationAmount / reactant1CationAmount;
          reactant1CationAmount = this.reactant1CationSubscript * this.reactant1Coefficient;
          reactant1AnionAmount = this.reactant1AnionSubscript * this.reactant1Coefficient;
        }
      // Tests if cation amounts are the same
      } else if (reactant2CationAmount !== product2CationAmount) {
        // If not the same test which is bigger and increase the appropriate coefficient
        if (reactant2CationAmount > product2CationAmount) {
          this.product2Coefficient *= reactant2CationAmount / product2CationAmount;
          product2CationAmount = this.reactant2CationSubscript * this.reactant2Coefficient;
          product2AnionAmount = this.product2AnionSubscript * this.product2Coefficient;
        } else {
          this.reactant2Coefficient *= product2CationAmount / reactant2CationAmount;
          reactant2CationAmount = this.reactant2CationSubscript * this.reactant2Coefficient;
          reactant2AnionAmount = this.reactant2AnionSubscript * this.reactant2Coefficient;
        }
      // Tests if anion amounts are the same
      } else if (reactant1AnionAmount !== product2AnionAmount) {
        // If not the same test which is bigger and increase the appropriate coefficient
        if (reactant1AnionAmount > product2AnionAmount) {
          this.product2Coefficient *= reactant1AnionAmount / product2AnionAmount;
          product2CationAmount = this.product2CationSubscript * this.product2Coefficient;
          product2AnionAmount = this.product2AnionSubscript * this.product2Coefficient;
        } else {
          this.reactant1Coefficient *= product1CationAmount / reactant1CationAmount;
          reactant1CationAmount = this.reactant1CationSubscript * this.reactant1Coefficient;
          reactant1AnionAmount = this.reactant1AnionSubscript * this.reactant1Coefficient;
        }
      // Tests if anion amounts are the same
      } else if (reactant2AnionAmount !== product1AnionAmount) {
        // If not the same test which is bigger and increase the appropriate coefficient
        if (reactant2AnionAmount > product1AnionAmount) {
          this.product1Coefficient *= reactant2AnionAmount / product1AnionAmount;
          product1CationAmount = this.product1CationSubscript * this.product1Coefficient;
          product1AnionAmount = this.product1AnionSubscript * this.product1Coefficient;
        } else {
          this.reactant2Coefficient *= product1AnionAmount / reactant2AnionAmount;
          reactant2CationAmount = this.reactant2CationSubscript * this.reactant2Coefficient;
          reactant2AnionAmount = this.reactant2AnionSubscript * this.reactant2Coefficient;
        }
      } 

      /* Debug, add/remove the * / here to enable/disable the code -> */
      console.log("The following data is printed for debug purposes, please disable this block in answer-key.model.ts if you are not debugging the system.");
      console.log("Finished loop itteration " + x);
      /* */
    }

    /* Debug, add/remove the * / here to enable/disable the code -> */
    console.log("The following data is printed for debug purposes, please disable this block in answer-key.model.ts if you are not debugging the system.");
    console.log("Finished main loop and beginning fixDecimalCoefficients");
    /* */

    // As there may be decimal coefficients, this needs to be corrected right after balancing.
    this.fixDecimalCoefficients();
  }

  // This method runs after the balanceEquation() method
  // It corrects the possibility of decimal coefficients
  public fixDecimalCoefficients(): void {

    // This number will store the decimal to be divided by
    let coefficientDecimal: number;

    // Runs for as long as there is a coefficient that isn't an integer (should only be once though)
    if (
      (this.reactant1Coefficient % 1) !== 0 ||
      (this.reactant2Coefficient % 1) !== 0 ||
      (this.product1Coefficient % 1) !== 0 ||
      (this.product2Coefficient % 1) !== 0
    ) {

      // If reactant1Coefficient has a decimal
      if((coefficientDecimal = this.reactant1Coefficient % 1) !== 0) {

        // divide all Coefficients by the decimal (effectively multiplying by the inverse of the decimal)
        this.reactant1Coefficient /= coefficientDecimal;
        this.reactant2Coefficient /= coefficientDecimal;
        this.product1Coefficient /= coefficientDecimal;
        this.product2Coefficient /= coefficientDecimal;
      }

      // If reactant1Coefficient has a decimal
      if((coefficientDecimal = this.reactant2Coefficient % 1) !== 0) {

        // divide all Coefficients by the decimal (effectively multiplying by the inverse of the decimal)
        this.reactant1Coefficient /= coefficientDecimal;
        this.reactant2Coefficient /= coefficientDecimal;
        this.product1Coefficient /= coefficientDecimal;
        this.product2Coefficient /= coefficientDecimal;
      }

      // If reactant1Coefficient has a decimal
      if((coefficientDecimal = this.product1Coefficient % 1) !== 0) {

        // divide all Coefficients by the decimal (effectively multiplying by the inverse of the decimal)
        this.reactant1Coefficient /= coefficientDecimal;
        this.reactant2Coefficient /= coefficientDecimal;
        this.product1Coefficient /= coefficientDecimal;
        this.product2Coefficient /= coefficientDecimal;
      }

      // If reactant1Coefficient has a decimal
      if((coefficientDecimal = this.product2Coefficient % 1) !== 0) {

        // divide all Coefficients by the decimal (effectively multiplying by the inverse of the decimal)
        this.reactant1Coefficient /= coefficientDecimal;
        this.reactant2Coefficient /= coefficientDecimal;
        this.product1Coefficient /= coefficientDecimal;
        this.product2Coefficient /= coefficientDecimal;
      }
    }
  }

  // This method calculates the mole rations of the products to the reactants
  public calculateMoleRatios(): void {

    // Since the coefficients are the moles of each molecule present in the reaction, this works
    this.moleRatioP1toR1 = this.product1Coefficient / this.reactant1Coefficient;
    this.moleRatioP1toR2 = this.product1Coefficient / this.reactant2Coefficient;
    this.moleRatioP2toR1 = this.product2Coefficient / this.reactant1Coefficient;
    this.moleRatioP2toR2 = this.product2Coefficient / this.reactant2Coefficient;
    
    // These are the ratios between reactants
    this.moleRatioR1toR2 = this.reactant1Coefficient / this.reactant2Coefficient;
    this.moleRatioR2toR1 = this.reactant2Coefficient / this.reactant1Coefficient;
  }

  // Rewrite to modularize the methods more.  
  // Retrieves each ion's charge and saves it
  public setCharges(): void {

    // Charge data, hard coded.  Please adapt to call data from backend
    const charge_table = {Li: 1, Na: 1, K: 1, NH4: 1, Mg: 2, Ca: 2, Ba : 2, Zn: 2, 'Fe(II)': 2,
    Cu: 2, Al: 3, 'Fe(III)': 3, Pb: 2, Ag : 1, Br : -1, I: -1, Cl: -1, NO3 : -1, CO3 : -2, ClO3 : -1,
    OH : -1, O2: -2, PO4: -3, SO4: -2, Cr2O7: -2};

    // Set the charge variables based on the data provided
    this.cation1Charge = charge_table[this.cation1 + ''];
    this.cation2Charge = charge_table[this.cation2 + ''];
    this.anion1Charge = charge_table[this.anion1 + ''];
    this.anion2Charge = charge_table[this.anion2 + ''];
  }

  // This method is meant to function like his reaction_solubility(a) function
  // It generates each item's solubility information.
  public solubilityGeneration() {

    /* Debug add/remove the space in the * / to enable/disable the debug code -> */
    console.log("solubilityGeneration() Began");
    console.log(this.findSolubility);
    console.log("Cation1 " + this.cation1SolubilityData);
    console.log("Cation2 " + this.cation2SolubilityData);
    /* */

    if (this.findSolubility) { // If the data was loaded, then figure out each molecule's solubility

      /*
      0 = aqueous = (aq)
      1 = solid = (s)
      */

      // Reactant 1
      if (this.cation1SolubilityData[this.anion1 + ''] === 1) {
        this.reactant1Solubility = "(s)";
      } else if (this.cation1SolubilityData[this.anion1 + ''] === 0) {
        this.reactant1Solubility = "(aq)";
      } else {
        this.reactant1Solubility = "?";
      }

      // Reactant 2
      if (this.cation2SolubilityData[this.anion2 + ''] === 1) {
        this.reactant2Solubility = "(s)";
      } else if (this.cation2SolubilityData[this.anion2 + ''] === 0) {
        this.reactant2Solubility = "(aq)";
      } else {
        this.reactant2Solubility = "?";
      }

      // Product 1
      if (this.cation1SolubilityData[this.anion2 + ''] === 1) {
        this.product1Solubility = "(s)";
      } else if (this.cation1SolubilityData[this.anion2 + ''] === 0) {
        this.product1Solubility = "(aq)";
      } else {
        this.product1Solubility = "?";
      }

      // Product 2
      if (this.cation2SolubilityData[this.anion1 + ''] === 1) {
        this.product2Solubility = "(s)";
      } else if (this.cation2SolubilityData[this.anion1 + ''] === 0) {
        this.product2Solubility = "(aq)";
      } else {
        this.product2Solubility = "?";
      }
    } else { // Otherwise, set the solubility to empty values to avoid issues (probably)

      this.reactant1Solubility = '';
      this.reactant2Solubility = '';
      this.product1Solubility = '';
      this.product2Solubility = '';
    }
  }

  // This method calculates the moles of each and determines the limiting reactant
  public determineLimitingReactant(): void {

    // check if product moles from R1 are less than R2
    if (
      this.molesP1FromR1 < this.molesP1FromR2 && 
      this.molesP2FromR1 < this.molesP2FromR2
    ) { // if so

      // Calculate the mass yield
      this.yieldProduct1 = this.molesP1FromR1 * this.product1Weight;
      this.yieldProduct2 = this.molesP2FromR1 * this.product2Weight;

      // calculate the grams used, remaining, and the sum of all masses
      this.gramsUsed = (this.moleRatioR1toR2 * this.molesReactant1) * this.reactant2Weight;
      this.gramsRemaining = this.grams2 - this.gramsUsed;
      this.sumOfAll = (this.gramsRemaining + this.yieldProduct1 + this.yieldProduct2);

      // set the limiting reactant to reactant 1
      this.limitingReactant = this.reactant1;
      this.nonLimitingReactant = this.reactant2;

    } else { // otherwise

      // Calculate the mass yield
      this.yieldProduct1 = this.molesP1FromR2 * this.product1Weight;
      this.yieldProduct2 = this.molesP2FromR2 * this.product2Weight;

      // calculate the grams used, remaining, and the sum of all masses
      this.gramsUsed = (this.moleRatioR2toR1 * this.molesReactant2) * this.reactant1Weight;
      this.gramsRemaining = this.grams1 - this.gramsUsed;
      this.sumOfAll = (this.gramsRemaining + this.yieldProduct1 + this.yieldProduct2);

      // set the limiting reactant
      this.limitingReactant = this.reactant2;
      this.nonLimitingReactant = this.reactant1;
    }
  }

  // This method calculates the actual moles of the reactants
  // NOTE: This is separate from saveProductmoles(), as it is necessary to calculate the limiting reactant, which is necessary to get the actual value of the reactant moles.
  // tldr; more needed before product moles
  public calculateMoles(): void {
    
    // Mole calculations of the reactants
    this.molesReactant1 = this.grams1 / ((this.cation1Weight * this.reactant1CationSubscript) + (this.anion1Weight * this.reactant1AnionSubscript));
    this.molesReactant2 = this.grams2 / ((this.cation2Weight * this.reactant2CationSubscript) + (this.anion2Weight * this.reactant2AnionSubscript));

    // Mole *Potential* calculations of the products
    // Product 1
    this.molesP1FromR1 = this.molesReactant1 * this.moleRatioP1toR1;
    this.molesP1FromR2 = this.molesReactant2 * this.moleRatioP1toR2;
    // Product 2
    this.molesP2FromR1 = this.molesReactant1 * this.moleRatioP2toR1;
    this.molesP2FromR2 = this.molesReactant2 * this.moleRatioP2toR2;
  }
}
