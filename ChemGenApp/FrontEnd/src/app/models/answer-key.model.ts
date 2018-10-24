// Answer key to be used to hold the data inputed by the professors
// and the answers calculated by the application
export class AnswerKey {
  // Inputted data
  public anion1: String;
  public cation1: String;
  public grams1: number;
  public anion2: String;
  public cation2: String;
  public grams2: number;
  public cation1Weight: number;
  public anion1Weight: number;
  public cation2Weight: number;
  public anion2Weight: number;
  public cation1Charge: number;
  public anion1Charge: number;
  public cation2Charge: number;
  public anion2Charge: number;
  public displayKey: boolean;

  reactant1: String;
  reactant2: String;
  product1: String;
  product2: String;
  reactant1AnionSubscript: number;
  reactact1CationSubscript: number;
  reactant2AnionSubscript: number;
  reactact2CationSubscript: number;
  product1AnionSubscript: number;
  product1CationSubscript: number;
  product2AnionSubscript: number;
  product2CationSubscript: number;
  reactant1Coefficient: number;
  reactant2Coefficient: number;
  product1Coefficient: number;
  product2Coefficient: number;
  product1Weight: number;
  product2Weight: number;
  moleRatioP1toR1: number;
  moleRatioP1toR2: number;
  moleRatioP2toR1: number;
  moleRatioP2toR2: number;

  /* This section is all the variables I've added to facilitate transfer over to the HTML.  Remove this comment end to comment it out -->*/
  reactant1Subscript: String;
  reactant2Subscript: String;
  product1Subscript: String;
  product2Subscript: String;
  limitingReactant: String;

  constructor() {
    this.displayKey = false;
    this.reactant1Coefficient = 1;
    this.reactant2Coefficient = 1;
    this.product1Coefficient = 1;
    this.product2Coefficient = 1;
  }

  // Sets the subscripts of the elements
  public setSubScript(subscript: number): String {
    switch (subscript) {
      case 1:
        return '';
      case 2:
        return '\u2082';
      case 3:
        return '\u2083';
      default:
        return '!!!!! ERROR: SUBSCRIPT VALUE NOT HANDLED !!!!!';
    }
  }

  // Groups the cations, anions, and subscripts to create the molecules as a string
  public setMolecules(): void {
    this.reactant1 = '' + this.cation1 + this.setSubScript(this.reactact1CationSubscript) + this.anion1 +
      this.setSubScript(this.reactant1AnionSubscript);
    this.reactant2 = '' + this.cation2 + this.setSubScript(this.reactact2CationSubscript) + this.anion2 +
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
  }

  // Determnes the subscript based on opposing charges
  public determineSubscript(): void {
    this.reactant1AnionSubscript = (this.cation1Charge === Math.abs(this.anion1Charge)) ?
      1 : this.cation1Charge;
    this.reactact1CationSubscript = (this.cation1Charge === Math.abs(this.anion1Charge)) ?
      1 : Math.abs(this.anion1Charge);
    this.reactant2AnionSubscript = (this.cation2Charge === Math.abs(this.anion2Charge)) ?
      1 : this.cation2Charge;
    this.reactact2CationSubscript = (this.cation2Charge === Math.abs(this.anion2Charge)) ?
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
    let reactact1CationAmount: number = this.reactact1CationSubscript * this.reactant1Coefficient;
    let product1CationAmount: number = this.product1CationSubscript * this.product1Coefficient;
    let reactant1AnionAmount: number = this.reactant1AnionSubscript * this.reactant1Coefficient;
    let product1AnionAmount: number = this.product1AnionSubscript * this.product1Coefficient;
    let reactant2CationAmount: number = this.reactact2CationSubscript * this.reactant2Coefficient;
    let product2CationAmount: number = this.product2CationSubscript * this.product2Coefficient;
    let reactant2AnionAmount: number = this.reactant2AnionSubscript * this.reactant2Coefficient;
    let product2AnionAmount: number = this.product2AnionSubscript * this.product2Coefficient;

    // While loops tests that the amounts on either sde of the equation are equal
    while (reactact1CationAmount !== product1CationAmount || reactant1AnionAmount !== product2AnionAmount ||
      reactant2CationAmount !== product2CationAmount || reactant2AnionAmount !== product1AnionAmount) {

        // Tests if cation amounts are the same
        if (reactact1CationAmount !== product1CationAmount) {

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

      // Tests if cation amounts are the same
      if (reactant2CationAmount !== product2CationAmount) {

        // If not the same test which is bigger and increase the appropriate coefficient
        if (reactant2CationAmount > product2CationAmount) {
          this.product2Coefficient *= reactant2CationAmount / product2CationAmount;
          product2CationAmount = this.reactact2CationSubscript * this.reactant2Coefficient;
          product2AnionAmount = this.product2AnionSubscript * this.product2Coefficient;
        } else {
          this.reactant2Coefficient *= product2CationAmount / reactant2CationAmount;
          reactant2CationAmount = this.reactact2CationSubscript * this.reactant2Coefficient;
          reactant2AnionAmount = this.reactant2AnionSubscript * this.reactant2Coefficient;
        }
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
        }
    }
  }

  public calculateMoleRatios() {
    this.moleRatioP1toR1 = this.product1Coefficient / this.reactant1Coefficient;
    this.moleRatioP1toR2 = this.product1Coefficient / this.reactant2Coefficient;
    this.moleRatioP2toR1 = this.product2Coefficient / this.reactant1Coefficient;
    this.moleRatioP2toR2 = this.product2Coefficient / this.reactant2Coefficient;
  }

  // This method is meant to function like his reaction_solubility(a) function
  // It generates each item's solubility information.
  public solubilityGeneration() {
    // hardcoded solubility information.  Should be fine for now I guess.  Please replace this with retreiving from the backend asap
    // var solubilityData = { Li:{ Cl: "aq", Br: "aq", I: "aq", CO3: "aq", ClO3: "aq", OH:
    // "aq", NO3: "aq", PO4: "aq", SO4: "aq", Cr2O7: "aq"}, Na :{ Cl: "aq", Br: "aq", I : "aq",
    // CO3: "aq", ClO3: "aq", OH: "aq", NO3:"aq", PO4: "aq", SO4: "aq", Cr2O7: "aq"}, K :{ Cl: "aq",
    // Br: "aq", I : "aq", CO3: "aq", ClO3: "aq", OH: "aq", NO3:"aq", PO4: "aq", SO4: "aq", Cr2O7: "aq"},
    // NH4 :{ Cl: "aq", Br: "aq", I : "aq", CO3: "aq", ClO3: "aq", OH: "aq", NO3:"aq", PO4: "aq", SO4: "aq",
    // Cr2O7: "aq"}, Mg :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s", ClO3: "aq", OH: "s", NO3:"aq", PO4: "s",
    // SO4: "aq", Cr2O7: "s"}, Ca :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s", ClO3: "aq", OH: "s", NO3:"aq",
    // PO4: "s", SO4: "aq", Cr2O7: "s"}, Sr :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s", ClO3: "aq", OH: "aq",
    // NO3:"aq", PO4: "s", SO4: "s", Cr2O7: "s"}, Ba :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s", ClO3: "aq",
    // OH: "aq", NO3:"aq", PO4: "s", SO4: "s", Cr2O7: "s"}, Zn :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s",
    // ClO3: "aq", OH: "aq",O2 : "s", NO3:"aq", PO4: "s", SO4: "aq", Cr2O7: "s"}, FeII :{ Cl: "aq", Br: "aq",
    // I : "aq", CO3: I, ClO3: "aq", OH: "aq",O2 : "s", NO3:"aq", PO4: "s", SO4: "aq", Cr2O7: "s"},
    // Cu :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s", ClO3: "aq", OH: "aq",O2 : "s", NO3:"aq", PO4: "s",
    // SO4: "aq", Cr2O7: "s"}, Al :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s", ClO3: "aq", OH: "aq",O2 : "s",
    // NO3:"aq", PO4: "s", SO4: "aq", Cr2O7: "s"}, FeIII :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s", ClO3: "aq",
    // OH: "aq",O2 : "s", NO3:"aq", PO4: "s", SO4: "s", Cr2O7: "s"}, Pb : {Cl: "s",  Br: "s", I : "s", CO3: "s",
    // ClO3: "aq", OH: "s",O2 : "s", NO3:"aq", PO4: "s", SO4: "s", Cr2O7: "s"}, Ag : {Cl: "s",  Br: "s", I : "s",
    // CO3: "s", ClO3: "aq", OH: "s",O2 : "s", NO3:"aq", PO4: "s", SO4: "s", Cr2O7: "s"}};
    const solubilityData = {}; // empty object ...  The one above didn't seem to work properly with the letter I?

    // storage for sending the data.
    const solubility = [];

    // add all of the solubility data to the array to be sent where it's needed?
    solubility.push(solubilityData[this.cation1 + ''][this.anion1 + '']);
    solubility.push(solubilityData[this.cation2 + ''][this.anion2 + '']);
    solubility.push(solubilityData[this.cation1 + ''][this.anion2 + '']);
    solubility.push(solubilityData[this.cation2 + ''][this.anion1 + '']);

    // He sends it off to the main() method only, which is where the actuall stoichiometry is printed
    console.log('solubilty: ' + solubility);
    // this.solubility = solubility;
  }

  // Generates the correct form of notation for writing molecules.  Subscripts and all.
  // Also generates some Mole ratio information used in other methods
  public molecularNotationGeneration() {
    // Need the charge table here
    // Hard coding it for now
    const charge_table = {Li: 1, Na: 1, K: 1, NH4: 1, Mg: 2, Ca: 2, Ba : 2, Zn: 2, 'Fe(II)': 2,
    Cu: 2, Al: 3, 'Fe(III)': 3, Pb: 2, Ag : 1, Br : -1, I: -1, Cl: -1, NO3 : -1, CO3 : -2, ClO3 : -1,
    OH : -1, O2: -2, PO4: -3, SO4: -2, Cr2O7: -2};

    // This should avoid the need for looping through the table, as long as retrieving the object data is possible
    const ionCharge = [];
    ionCharge.push(charge_table[this.cation1 + '']);
    ionCharge.push(charge_table[this.anion1 + '']);
    ionCharge.push(charge_table[this.cation2 + '']);
    ionCharge.push(charge_table[this.anion2 + '']);

    /** NOTE: */
    // To simplify and shrink this part of the code, I am assuming there will be no zero charge ions,
    // and that the largest absolute value of a charge will be 3.
    // Please notify me if something about this goes wrong, or is wrong, and I will change it.
    const chargeTemp = []; // Temporary storage of the unicode subscript for the compound
    let temp = 0; // used to reduce the Math.abs() calls each loop
    for (let i = 0; i < ionCharge.length; i++) {
      temp = Math.abs(ionCharge[i]); // Gets the absolute value of the charge so that I can properly select the subscript
      if (temp === 1) {
        chargeTemp[i] = ''; // empty string for 1, since it doesn't get a subscript
      } else if (temp === 2) {
        chargeTemp[i] = '\u2082'; // \u2082 is subscript 2
      } else if (temp === 3) {
        chargeTemp[i] = '\u2083'; // \u2083 is subscript 3
      } else {
        chargeTemp[i] = '!!!!! ERROR, CHARGE VALUE NOT HANDLED !!!!!';
      }
    }

    // Combine the strings into the reactants and products
    this.reactant1Subscript = (this.cation1 + chargeTemp[1] + this.anion1 + chargeTemp[0]);
    this.reactant2Subscript = (this.cation2 + chargeTemp[3] + this.anion2 + chargeTemp[2]);
    this.product1Subscript = (this.cation1 + chargeTemp[3] + this.anion2 + chargeTemp[0]);
    this.product2Subscript = (this.cation2 + chargeTemp[1] + this.anion1 + chargeTemp[2]);

    // At this point, I have the strings that properly represent the products and reactants, including the subscripts

    // Not sure what this stuff is supposed to mean, so I can't come up with better names
    const z = 1.0;
    const w = z * (ionCharge[2] / ionCharge[0]);
    const x = -ionCharge[2] / -ionCharge[3];
    const y = ionCharge[2] * x / ionCharge[0];

    // The list of information that is sent off to wherever.
    const information = [w, x, y, z, ionCharge[0], ionCharge[1], ionCharge[2], ionCharge[3]];

    // Not sure if you need this returned, but the charge information at least needs to be sent to the stoichiometryGeneration() function
    return information;
  }

  // Time to make the hard one
  public stoichiometryGeneration() {

    // Not sure what this is used for yet
    const f = this.molecularNotationGeneration();

    // Hardcoded atomic masses using javascript objects  Please replace with appropriate backend call ASAP
    const txt = '{ "H" : 1.008, "He": 4.002, "Li" : 6.94, "Be" : 9.012, "B" : 10.81, "C" : 12.011, "N" : 14.007,' +
    '"O" : 15.999, "F" : 19.00, "Ne" : 20.1797, "Na" : 22.989, "Mg" : 24.305, "Al" : 26.981, "Si": 28.085,' +
    '"P": 30.973, "S" : 32.06, "Cl" : 35.45, "Ar" : 39.948, "K": 39.0983, "Ca": 40.078, "Sc": 44.955, "Ti" : 47.867,' +
    '"V" : 50.941, "Cr" : 51.996, "Mn": 54.938, "Fe": 55.845, "Co": 58.933, "Ni": 58.693, "Cu" : 63.546,' +
    '"Zn" : 65.38, "Ga": 69.723, "Ge": 72.630, "As" : 74.921, "Se": 78.971, "Br": 79.904, "Kr": 83.798,' +
    '"Rb": 85.4678, "Sr": 87.62, "Y": 88.905, "Zr" : 91.224, "Nb": 92.906, "Mo": 95.95, "Tc": 97, "Ru": 101.07,' +
    '"Rh": 102.905, "Pd": 106.42, "Ag": 107.868, "Cd": 112.414, "In": 114.818, "Sn": 118.710, "Sb": 121.760,' +
    '"Te": 127.760, "I": 126.904, "Xe" : 131.293, "Cs": 132.905, "Ba": 137.327, "La": 138.905, "Ce": 140.116,' +
    '"Pr": 140.907, "Nd": 144.242, "Pm": 145, "Sm": 150.36, "Eu": 151.964, "Gd": 157.25, "Tb": 158.925,' +
    '"Dy": 162.500, "Ho":164.930, "Er" : 167.259, "Tm":168.934, "Yb": 173.045, "Lu": 174.9668, "Hf": 178.49,' +
    '"Ta":180.947, "W": 183.84, "Re": 186.207, "Os": 190.23, "Ir": 192.21, "Pt": 195.084, "Au": 196.966,' +
    '"Hg": 200.592, "Tl": 204.38, "Pb": 207.2, "Bi": 208.980, "Po" : 209, "At": 210, "Rn": 222, "Fr": 223,' +
    '"Ra": 222, "Ac": 227, "Th": 232.0377, "Pa": 231.035, "U": 238.028, "(NO3)": 62.00, "O2": 32.00,' +
    '"(CO3)": 60.01, "(ClO3)": 83.447, "(OH)": 17.01, "(PO4)": 94.9714, "(SO4)": 96.06, "(Cr2O7)":215.985,' +
    '"(NH4)" : 18.00}';
    const atomicWeights = JSON.parse(txt);

    // A list of the weights of the cations and anions
    const listOfWeights = [];

    // load the list with the appropriate values
    listOfWeights.push(atomicWeights[this.cation1 + '']);
    listOfWeights.push(atomicWeights[this.anion1 + '']);
    listOfWeights.push(atomicWeights[this.cation2 + '']);
    listOfWeights.push(atomicWeights[this.anion2 + '']);

    // This is to generate the mole ratios used in the below print statements
    this.moleRatioP1toR1 = (f[2] / f[0]);
    this.moleRatioP1toR2 = (f[2] / f[1]);
    this.moleRatioP2toR1 = (f[3] / f[0]);
    this.moleRatioP2toR2 = (f[3] / f[1]);
    // I'm still not entirely sure what the even f[]'s are.  I can't describe them ...

    /*  He had this code.  I have all the data prepared by this point. Please ask if you have any trouble figuring out what this does.
		print("\n")
		print("mole ratio of product {} to reactant {} is: {}".format(f[5], f[1], mole_P1toR1))
		print("mole ratio of product {} to reactant {} is: {}".format(f[5], f[3], mole_P1toR2))
		print("mole ratio of product {} to reactant {} is: {}".format(f[7], f[1], mole_P2toR1))
		print("mole ratio of product {} to reactant {} is: {}".format(f[7], f[3], mole_P2toR2))
		print("\n")

		seems to say want the following printed out.  Replace the <info> with what the stuff inside the <>'s describe

		"mole ratio of product <this.product1Subscript> to reactant <this.reactant1Subscript> is: <moleRatioP1toR1>"
		"mole ratio of product <this.product1Subscript> to reactant <this.reactant2Subscript> is: <moleRatioP1toR2>"
		"mole ratio of product <this.product2Subscript> to reactant <this.reactant1Subscript> is: <moleRatioP2toR1>"
		"mole ratio of product <this.product2Subscript> to reactant <this.reactant2Subscript> is: <moleRatioP2toR2>"
		*/

    // FORMULA WEIGHT
    const product1FormulaWeight = (listOfWeights[0] * (f[7]) + listOfWeights[3] * (f[4]));
    const product2FormulaWeight = (listOfWeights[2] * (f[5]) + listOfWeights[1] * (f[6]));

    /* He had this code.  I have everything prepared by this point.  Shouldn't be too hard to understand.
		print("The formula weight for product 1 is:", product1FormulaWeight)
		print("The formula weight for product 2 is: ", product2FormulaWeight)
		print("\n")
		*/

    // PREPARE FOR LIMITING REACTANT
    const mol_compound_1 = this.grams1 / (listOfWeights[0] * (f[5]) + listOfWeights[1] * (f[4]));
    const mol_compound_2 = this.grams2 / (listOfWeights[3] * (f[6]) + listOfWeights[2] * (f[7]));

    const P1_mols_R1 = mol_compound_1 * this.moleRatioP1toR1;
    const P2_mols_R1 = mol_compound_1 * this.moleRatioP2toR1;
    const P1_mols_R2 = mol_compound_2 * this.moleRatioP1toR2;
    const P2_mols_R2 = mol_compound_2 * this.moleRatioP2toR2;

    /* He had this code.  I have everything prepared by this point.  Please ask if there is anything you have trouble with.
		print("\n")
		print("{} moles of {} yields {} for moles of {}". format(mol_compound_1, f[1], P1_mols_R1, f[5]))
		print("{} moles of {} yields {} for moles of {}". format(mol_compound_1, f[1], P2_mols_R1, f[7]))
		print("{} moles of {} yields {} for moles of {}". format(mol_compound_2, f[3], P1_mols_R2, f[5]))
		print("{} moles of {} yields {} for moles of {}". format(mol_compound_2, f[3], P2_mols_R2, f[7]))
		print("\n")
		*/

    // DETERMINING LIMITING REACTANT
    if (P1_mols_R1 < P1_mols_R2 && P2_mols_R1 < P2_mols_R2) {

      // Most of this stuff is almost purely what he had in his code, but reformatted to work in javascript and re-organized

      const Yield_P1 = P1_mols_R1 * product1FormulaWeight;
      const Yield_P2 = P2_mols_R1 * product2FormulaWeight;

      const FW_comp2 = (listOfWeights[3] * (f[6]) + listOfWeights[2] * (f[7]));
      const grams_used = ((f[1] / f[0]) * mol_compound_1) * FW_comp2;

      const excess_grams = this.grams2 - grams_used;

      const sum_of_masses = (excess_grams + Yield_P1 + Yield_P2);

      this.limitingReactant = this.reactant1Subscript;
      /* He had this code.  I should have everything prepared for outputting this, but if there are any issues, please tell me.
			print ( "The limiting reactant is: ", f[1])
			print("The limiting reactant {} yields  {} grams of {}  and  {} grams of {}".format(f[1], Yield_P1, f[5], Yield_P2, f[7]))
			print(" the amount of excess reactant {} is {}  grams". format(f[3], excess_grams))
			print("The sum of masses {} should be close to the sum of compound 1 {} + sum of compound 2 {}".format(sum_of_masses, a[4], a[5]))
			*/
    } else {

      // Most of this stuff is almost purely what he had in his code, but reformatted to work in javascript and re-organized

      const Yield_P1 = P1_mols_R2 * product1FormulaWeight;
      const Yield_P2 = P2_mols_R2 * product2FormulaWeight;

      const molR1_to_R2 = f[0] / f[1];
      const molR1 = molR1_to_R2 * mol_compound_2;

      const FW_comp1 = (listOfWeights[0] * (f[5]) + listOfWeights[1] * (f[4]));

      const grams_used = molR1 * FW_comp1;
      const excess_grams = this.grams1 - grams_used;

      const sum_of_masses = (excess_grams + Yield_P1 + Yield_P2);

      this.limitingReactant = this.reactant2Subscript;
      /* He had this code.
			print ( "The limiting reactant is: ", f[3])
			print("The limiting reactant {} yields  {} grams of {}  and  {} grams of {}".format(f[3], Yield_P1, f[5], Yield_P2, f[7]))

			print(molR1_to_R2) // NOTE: (from William) not sure if this is necessary?

			print("\nThe grams used up is:", grams_used)
			print("\nthe amount of excess reactant {} is {}  grams". format(f[1], excess_grams))
			print("\n The sum of excess plus used reagents {} ought to equal the grams of compound 1 {}
			and grams of compound 2 {}".format(sum_of_masses, a[4], a[5]))
			*/
    }
  }
}
