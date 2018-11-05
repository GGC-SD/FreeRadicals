// Answer key to be used to hold the data inputed by the professors
// and the answers calculated by the application
export class AnswerKey {
  
  // Whether or not the output is displayed
  public displayKey: boolean;

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

  // Runs at the beginning (obviously)
  constructor() {

    // Make sure the display is off by default
    this.displayKey = false;

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
    
    // Determines the amount of cations and anions in each molecule based on subscript and coefficient
    // This keeps track of how many there are in each molecule, and checks that they all are the same.
    let reactact1CationAmount: number = this.reactant1CationSubscript * this.reactant1Coefficient;
    let product1CationAmount: number = this.product1CationSubscript * this.product1Coefficient;
    let reactant1AnionAmount: number = this.reactant1AnionSubscript * this.reactant1Coefficient;
    let product1AnionAmount: number = this.product1AnionSubscript * this.product1Coefficient;
    let reactant2CationAmount: number = this.reactant2CationSubscript * this.reactant2Coefficient;
    let product2CationAmount: number = this.product2CationSubscript * this.product2Coefficient;
    let reactant2AnionAmount: number = this.reactant2AnionSubscript * this.reactant2Coefficient;
    let product2AnionAmount: number = this.product2AnionSubscript * this.product2Coefficient;

    // While loops tests that the amounts on either side of the equation are equal
    while (
      reactact1CationAmount !== product1CationAmount ||
      reactant1AnionAmount !== product2AnionAmount ||
      reactant2CationAmount !== product2CationAmount || 
      reactant2AnionAmount !== product1AnionAmount
    ) {

<<<<<<< HEAD
          // If not the same test which is bigger and increase the appropriate coefficient
          if (reactact1CationAmount > product1CationAmount) {
            this.product1Coefficient *= reactact1CationAmount / product1CationAmount;
            product1CationAmount = this.product1CationSubscript * this.product1Coefficient;
            product1AnionAmount = this.product1AnionSubscript * this.product1Coefficient;
          } else {
            this.reactant1Coefficient *= product1CationAmount / reactact1CationAmount;
            reactact1CationAmount = this.reactact1CationSubscript * this.reactant1Coefficient;
            reactant1AnionAmount = this.reactant1AnionSubscript * this.reactant1Coefficient;
          }
        }
=======
      // Tests if cation amounts are the same
      if (reactact1CationAmount !== product1CationAmount) {
>>>>>>> Testing

        // If not the same test which is bigger and increase the appropriate coefficient
        if (reactact1CationAmount > product1CationAmount) {
          this.product1Coefficient *= reactact1CationAmount / product1CationAmount;
          product1CationAmount = this.product1CationSubscript * this.product1Coefficient;
          product1AnionAmount = this.product1AnionSubscript * this.product1Coefficient;
        } else {
          this.reactant1Coefficient *= product1CationAmount / reactact1CationAmount;
          reactact1CationAmount = this.reactant1CationSubscript * this.reactant1Coefficient;
          reactant1AnionAmount = this.reactant1AnionSubscript * this.reactant1Coefficient;
        }
      // Tests if cation amounts are the same
<<<<<<< HEAD
      if (reactant2CationAmount !== product2CationAmount) {

=======
      } else if (reactant2CationAmount !== product2CationAmount) {
>>>>>>> Testing
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
<<<<<<< HEAD
      }

        // Tests if anion amounts are the same
        if (reactant1AnionAmount !== product2AnionAmount) {

          // If not the same test which is bigger and increase the appropriate coefficient
          if (reactant1AnionAmount > product2AnionAmount) {
            this.product2Coefficient *= reactant1AnionAmount / product2AnionAmount;
            product2CationAmount = this.product2CationSubscript * this.product2Coefficient;
            product2AnionAmount = this.product2AnionSubscript * this.product2Coefficient;
          } else {
            this.reactant1Coefficient *= product1CationAmount / reactact1CationAmount;
            reactact1CationAmount = this.reactact1CationSubscript * this.reactant1Coefficient;
            reactant1AnionAmount = this.reactant1AnionSubscript * this.reactant1Coefficient;
          }
        }

        // Tests if anion amounts are the same
        if (reactant2AnionAmount !== product1AnionAmount) {

          // If not the same test which is bigger and increase the appropriate coefficient
          if (reactant2AnionAmount > product1AnionAmount) {
            this.product1Coefficient *= reactant2AnionAmount / product1AnionAmount;
            product1CationAmount = this.product1CationSubscript * this.product1Coefficient;
            product1AnionAmount = this.product1AnionSubscript * this.product1Coefficient;
          } else {
            this.reactant2Coefficient *= product1AnionAmount / reactant2AnionAmount;
            reactant2CationAmount = this.reactact2CationSubscript * this.reactant2Coefficient;
            reactant2AnionAmount = this.reactant2AnionSubscript * this.reactant2Coefficient;
          }
=======
      // Tests if anion amounts are the same
      } else if (reactant1AnionAmount !== product2AnionAmount) {
        // If not the same test which is bigger and increase the appropriate coefficient
        if (reactant1AnionAmount > product2AnionAmount) {
          this.product2Coefficient *= reactant1AnionAmount / product2AnionAmount;
          product2CationAmount = this.product2CationSubscript * this.product2Coefficient;
          product2AnionAmount = this.product2AnionSubscript * this.product2Coefficient;
        } else {
          this.reactant1Coefficient *= product1CationAmount / reactact1CationAmount;
          reactact1CationAmount = this.reactant1CationSubscript * this.reactant1Coefficient;
          reactant1AnionAmount = this.reactant1AnionSubscript * this.reactant1Coefficient;
>>>>>>> Testing
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
    }
    // As there may be decimal coefficients, this needs to be corrected right after balancing.
    this.fixDecimalCoefficients();
  }

<<<<<<< HEAD
  // Calculates mole ratios based on coefficients
  public calculateMoleRatios() {
=======
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
>>>>>>> Testing
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
    
    const solubilityData = {}; // Fill this with all of the solubility data, or at least send the solubility data here so that it can be used under the name solubilityData

    // storage for sending the data.
    const solubility = [];

    // add all of the solubility data to the array to be sent where it's needed?
    solubility.push(solubilityData[this.cation1 + ''][this.anion1 + '']);
    solubility.push(solubilityData[this.cation2 + ''][this.anion2 + '']);
    solubility.push(solubilityData[this.cation1 + ''][this.anion2 + '']);
    solubility.push(solubilityData[this.cation2 + ''][this.anion1 + '']);
    
    // Log command, to be removed after testing is done with this method (or commented out)
    console.log('solubilty: ' + solubility);

    // Save the solubility data of the molecules.
    /* add a * / to the end of this line to enable the code (does not work as of this writing)
    this.reactant1Solubility = solubility[0];
    this.reactant2Solubility = solubility[1];
    this.product1Solubility = solubility[2];
    this.product2Solubility = solubility[3];
    /**/
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
