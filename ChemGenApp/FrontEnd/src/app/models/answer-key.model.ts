// Answer key to be used to hold the data inputed by the professors
// and the answers calculated by the application
export class AnswerKey {
	anion1: String;
	cation1: String;
	grams1: number;
	anion2: String;
	cation2: String;
	grams2: number;
	displayKey: boolean;

	constructor() {
		this.displayKey = false;
	}

	// Prints all the properties to the console
	// Used for debugging
	public printProperties(): void {
		console.log(this.anion1);
		console.log(this.cation1);
		console.log(this.grams1);
		console.log(this.anion2);
		console.log(this.cation2);
		console.log(this.grams2);
	}
	
	/*
	// This method is meant to function like his reaction_solubility(a) function
	// It generates each item's solubility information.
	public solubilityGeneration() {
		// hardcoded solubility information.  Should be fine for now I guess.  Please replace this with retreiving from the backend asap
		// var solubilityData = { Li:{ Cl: "aq", Br: "aq", I: "aq", CO3: "aq", ClO3: "aq", OH: "aq", NO3: "aq", PO4: "aq", SO4: "aq", Cr2O7: "aq"}, Na :{ Cl: "aq", Br: "aq", I : "aq", CO3: "aq", ClO3: "aq", OH: "aq", NO3:"aq", PO4: "aq", SO4: "aq", Cr2O7: "aq"}, K :{ Cl: "aq", Br: "aq", I : "aq", CO3: "aq", ClO3: "aq", OH: "aq", NO3:"aq", PO4: "aq", SO4: "aq", Cr2O7: "aq"}, NH4 :{ Cl: "aq", Br: "aq", I : "aq", CO3: "aq", ClO3: "aq", OH: "aq", NO3:"aq", PO4: "aq", SO4: "aq", Cr2O7: "aq"}, Mg :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s", ClO3: "aq", OH: "s", NO3:"aq", PO4: "s", SO4: "aq", Cr2O7: "s"}, Ca :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s", ClO3: "aq", OH: "s", NO3:"aq", PO4: "s", SO4: "aq", Cr2O7: "s"}, Sr :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s", ClO3: "aq", OH: "aq", NO3:"aq", PO4: "s", SO4: "s", Cr2O7: "s"}, Ba :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s", ClO3: "aq", OH: "aq", NO3:"aq", PO4: "s", SO4: "s", Cr2O7: "s"}, Zn :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s", ClO3: "aq", OH: "aq",O2 : "s", NO3:"aq", PO4: "s", SO4: "aq", Cr2O7: "s"}, FeII :{ Cl: "aq", Br: "aq", I : "aq", CO3: I, ClO3: "aq", OH: "aq",O2 : "s", NO3:"aq", PO4: "s", SO4: "aq", Cr2O7: "s"}, Cu :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s", ClO3: "aq", OH: "aq",O2 : "s", NO3:"aq", PO4: "s", SO4: "aq", Cr2O7: "s"}, Al :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s", ClO3: "aq", OH: "aq",O2 : "s", NO3:"aq", PO4: "s", SO4: "aq", Cr2O7: "s"}, FeIII :{ Cl: "aq", Br: "aq", I : "aq", CO3: "s", ClO3: "aq", OH: "aq",O2 : "s", NO3:"aq", PO4: "s", SO4: "s", Cr2O7: "s"}, Pb : {Cl: "s",  Br: "s", I : "s", CO3: "s", ClO3: "aq", OH: "s",O2 : "s", NO3:"aq", PO4: "s", SO4: "s", Cr2O7: "s"}, Ag : {Cl: "s",  Br: "s", I : "s", CO3: "s", ClO3: "aq", OH: "s",O2 : "s", NO3:"aq", PO4: "s", SO4: "s", Cr2O7: "s"}};
		var solubilityData = {}; //empty object ...  The one above didn't seem to work properly with the letter I?
		
		// storage for sending the data.
		var solubility = [];
		
		// Temp testing code - Seems to calm the compilation issue, but I'm not sure why doing cation: String; causes the incompatibility...
		var cat1 = this.cation1 + '';
		var cat2 = this.cation2 + '';
		var an1 = this.anion1 + '';
		var an2 = this.anion2 + '';
		
		// add all of the solubility data to the array to be sent where it's needed?
		solubility.push(solubilityData[cat1][an1]);
		solubility.push(solubilityData[cat2][an2]);
		solubility.push(solubilityData[cat1][an2]);
		solubility.push(solubilityData[cat2][an1]);
		
		
		// He sends it off to the main() method only, which is where the actuall stoichiometry is printed
		console.log('solubilty: ' + solubility);
		this.solubility = solubility;
	}
	*/
	
	// Generates the correct form of notation for writing molecules.  Subscripts and all.
	// Also generates some Mole ratio information used in other methods
	public molecularNotationGeneration() {
		// Need the charge table here
		// Hard coding it for now
		
		var charge_table = {Li: 1, Na: 1, K:1, NH4: 1, Mg: 2, Ca: 2, Ba : 2, Zn: 2, FeII: 2, Cu: 2, Al: 3, FeIII: 3, Pb: 2, Ag : 1, Br : -1, I:-1, Cl: -1, NO3 : -1, CO3 : -2, ClO3 : -1, OH : -1, O2: -2, PO4: -3, SO4: -2, Cr2O7: -2};
		
		var w, x, y, z, reactant1, reactant2, product1, product2;
		var ion_charge = [];
		
		/** WARNING: THIS PART OF THE CODE ASSUMES NO ()'s ARE ON THE VALUES. WE MAY NEED TO HANDLE THIS SPECILALLY */
		
		// Temp testing code - Seems to calm the compilation issue, but I'm not sure why doing cation: String; causes the incompatibility...
		var cat1 = this.cation1 + '';
		var cat2 = this.cation2 + '';
		var an1 = this.anion1 + '';
		var an2 = this.anion2 + '';
		
		// This should avoid the need for looping through the table, as long as retrieving the object data is possible
		ion_charge.push(charge_table[cat1]);
		ion_charge.push(charge_table[an1]);
		ion_charge.push(charge_table[cat2]);
		ion_charge.push(charge_table[an2]);
		
		/** NOTE: */
		// To simplify and shrink this part of the code, I am assuming there will be no zero charge ions, and that the largest absolute value of a charge will be 3.
		// Please notify me if something about this goes wrong, or is wrong, and I will change it.
		var chargeTemp = []; // Temporary storage of the unicode subscript for the compound
		var temp = 0; // used to reduce the Math.abs() calls each loop
		for (var i = 0; i < ion_charge.length; i++) {
			temp = Math.abs(ion_charge[i]); // Gets the absolute value of the charge so that I can properly select the subscript
			if(temp === 1) {
				chargeTemp[i] = ""; // empty string for 1, since it doesn't get a subscript
			} else if (temp === 2) {
				chargeTemp[i] = "\u2082"; // \u2082 is subscript 2
			} else if (temp === 3) {
				chargeTemp[i] = "\u2083"; // \u2083 is subscript 3
			}
		}
		
		// Combine the strings into the reactants and products
		reactant1 = (this.cation1 + chargeTemp[1] + this.anion1 + chargeTemp[0]);
		reactant2 = (this.cation2 + chargeTemp[3] + this.anion2 + chargeTemp[2]);
		product1 = (this.cation1 + chargeTemp[3] + this.anion2 + chargeTemp[0]);
		product2 = (this.cation2 + chargeTemp[1] + this.anion1 + chargeTemp[2]);
		
		// At this point, I have the strings that properly represent the products and reactants, including the subscripts
		
		// Not sure what this stuff is supposed to mean, so I can't come up with better names
		z = 1.0;
		w = z*(ion_charge[2]/ion_charge[0]);
		x = -ion_charge[2]/-ion_charge[3];
		y = ion_charge[2]*x/ion_charge[0];
		
		// The list of information that is sent off to wherever.
		var information = [w, reactant1, x, reactant2, y, product1, z, product2, ion_charge[0], -ion_charge[1], ion_charge[2], -ion_charge[3]];
		
		// Not sure if you need this returned, but the charge information at least needs to be sent to the limiting_stoichiometry funciton's replacement
		return information;
	}
	
	//Time to make the hard one
	public stoichiometryGeneration() {
		
		// Not sure what this is used for yet
		var f = this.molecularNotationGeneration();
		
		// Hardcoded atomic masses using javascript objects  Please replace with appropriate backend call ASAP
		var txt = '{ "H" : 1.008, "He": 4.002, "Li" : 6.94, "Be" : 9.012, "B" : 10.81, "C" : 12.011, "N" : 14.007, "O" : 15.999, "F" : 19.00, "Ne" : 20.1797, "Na" : 22.989, "Mg" : 24.305, "Al" : 26.981, "Si": 28.085, "P": 30.973, "S" : 32.06, "Cl" : 35.45, "Ar" : 39.948, "K": 39.0983, "Ca": 40.078, "Sc": 44.955, "Ti" : 47.867, "V" : 50.941, "Cr" : 51.996, "Mn": 54.938, "Fe": 55.845, "Co": 58.933, "Ni": 58.693, "Cu" : 63.546, "Zn" : 65.38, "Ga": 69.723, "Ge": 72.630, "As" : 74.921, "Se": 78.971, "Br": 79.904, "Kr": 83.798, "Rb": 85.4678, "Sr": 87.62, "Y": 88.905, "Zr" : 91.224, "Nb": 92.906, "Mo": 95.95, "Tc": 97, "Ru": 101.07, "Rh": 102.905, "Pd": 106.42, "Ag": 107.868, "Cd": 112.414, "In": 114.818, "Sn": 118.710, "Sb": 121.760, "Te": 127.760, "I": 126.904, "Xe" : 131.293, "Cs": 132.905, "Ba": 137.327, "La": 138.905, "Ce": 140.116, "Pr": 140.907, "Nd": 144.242, "Pm": 145, "Sm": 150.36, "Eu": 151.964, "Gd": 157.25, "Tb": 158.925, "Dy": 162.500, "Ho":164.930, "Er" : 167.259, "Tm":168.934, "Yb": 173.045, "Lu": 174.9668, "Hf": 178.49, "Ta":180.947, "W": 183.84, "Re": 186.207, "Os": 190.23, "Ir": 192.21, "Pt": 195.084, "Au": 196.966, "Hg": 200.592, "Tl": 204.38, "Pb": 207.2, "Bi": 208.980, "Po" : 209, "At": 210, "Rn": 222, "Fr": 223, "Ra": 222, "Ac": 227, "Th": 232.0377, "Pa": 231.035, "U": 238.028, "(NO3)": 62.00, "O2": 32.00, "(CO3)": 60.01, "(ClO3)": 83.447, "(OH)": 17.01, "(PO4)": 94.9714, "(SO4)": 96.06, "(Cr2O7)":215.985, "(NH4)" : 18.00}';
		var atomicWeights = JSON.parse(txt);
		
		// A list of the weights of the cations and anions
		var listOfWeights = [];
		
		// Temp testing code - Seems to calm the compilation issue, but I'm not sure why doing cation: String; causes the incompatibility...
		var cat1 = this.cation1 + '';
		var cat2 = this.cation2 + '';
		var an1 = this.anion1 + '';
		var an2 = this.anion2 + '';
		
		// load the list with the appropriate values
		listOfWeights.push(atomicWeights[cat1]);
		listOfWeights.push(atomicWeights[an1]);
		listOfWeights.push(atomicWeights[cat2]);
		listOfWeights.push(atomicWeights[an2]);
		
		/** NOTE: This is a reference for filling the strings below
		f[1] is reactant molecule #1 (this.cation1 + this.anion1 with subscript stuff)
		f[3] is reactant molecule #2 (this.cation2 + this.anion2 with subscript stuff)
		f[5] is product molecule #1 (this.cation1 + this.anion2 with subscript stuff)
		f[7] is product molecule #2 (this.cation2 + this.anion1 with subscript stuff)
		*/
		
		
		//This is to generate the mole ratios used in the below print statements
		var mole_P1toR1 = (f[4]/f[0]);
		var mole_P1toR2 = (f[4]/f[2]);
		var mole_P2toR1 = (f[6]/f[0]);
		var mole_P2toR2 = (f[6]/f[2]);
		// I'm still not entirely sure what the even f[]'s are.  I can't describe them ...
		
		/*  He had this code.  I have all the data prepared by this point. Please ask if you have any trouble figuring out what this does. 
		print("\n")
		print("mole ratio of product {} to reactant {} is: {}".format(f[5], f[1], mole_P1toR1))
		print("mole ratio of product {} to reactant {} is: {}".format(f[5], f[3], mole_P1toR2))
		print("mole ratio of product {} to reactant {} is: {}".format(f[7], f[1], mole_P2toR1))
		print("mole ratio of product {} to reactant {} is: {}".format(f[7], f[3], mole_P2toR2))
		print("\n")
		*/
		
		// FORMULA WEIGHT
		var FW_product_1 = (listOfWeights[0]*(f[11]) + listOfWeights[3]*(f[8]));
		var FW_product_2 = (listOfWeights[2]*(f[9]) + listOfWeights[1]*(f[10]));
		
		/* He had this code.  I have everything prepared by this point.  Shouldn't be too hard to understand.
		print("The formula weight for product 1 is:", FW_product_1)
		print("The formula weight for product 2 is: ", FW_product_2)
		print("\n")
		*/
		
		// PREPARE FOR LIMITING REACTANT
		var mol_compound_1 = this.grams1/(listOfWeights[0]*(f[9]) + listOfWeights[1]*(f[8]));
		var mol_compound_2 = this.grams2/(listOfWeights[3]*(f[10]) + listOfWeights[2]*(f[11]));
		
		var P1_mols_R1 = mol_compound_1 * mole_P1toR1;
		var P2_mols_R1 = mol_compound_1 * mole_P2toR1;
		var P1_mols_R2 = mol_compound_2 * mole_P1toR2;
		var P2_mols_R2 = mol_compound_2 * mole_P2toR2;
		
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
			
			var Yield_P1 = P1_mols_R1 * FW_product_1;
			var Yield_P2 = P2_mols_R1 * FW_product_2;
			
			var FW_comp2 = (listOfWeights[3]*(f[10]) + listOfWeights[2]*(f[11]));
			var grams_used = ((f[2]/f[0])*mol_compound_1) * FW_comp2;
			
			var excess_grams = this.grams2 - grams_used;
			
			var sum_of_masses = (excess_grams + Yield_P1 + Yield_P2);
			/* He had this code.  I should have everything prepared for outputting this, but if there are any issues, please tell me.
			print ( "The limiting reactant is: ", f[1])
			print("The limiting reactant {} yields  {} grams of {}  and  {} grams of {}".format(f[1], Yield_P1, f[5], Yield_P2, f[7]))
			print(" the amount of excess reactant {} is {}  grams". format(f[3], excess_grams))
			print("The sum of masses {} should be close to the sum of compound 1 {} + sum of compound 2 {}".format(sum_of_masses, a[4], a[5]))
			*/
		} else {
			
			// Most of this stuff is almost purely what he had in his code, but reformatted to work in javascript and re-organized
			
			var Yield_P1 = P1_mols_R2 * FW_product_1;
			var Yield_P2 = P2_mols_R2 * FW_product_2
			
			var molR1_to_R2 = f[0]/f[2];
			var molR1 = molR1_to_R2 * mol_compound_2;
			
			var FW_comp1 = (listOfWeights[0]*(f[9]) + listOfWeights[1]*(f[8]));
			
			var grams_used = molR1 * FW_comp1;
			var excess_grams = this.grams1 - grams_used;
			var sum_of_masses = (excess_grams + Yield_P1 + Yield_P2);
			
			/* He had this code.
			print ( "The limiting reactant is: ", f[3])
			print("The limiting reactant {} yields  {} grams of {}  and  {} grams of {}".format(f[3], Yield_P1, f[5], Yield_P2, f[7]))
			
			print(molR1_to_R2) // NOTE: (from William) not sure if this is necessary?
			
			print("\nThe grams used up is:", grams_used)
			print("\nthe amount of excess reactant {} is {}  grams". format(f[1], excess_grams))	
			print("\n The sum of excess plus used reagents {} ought to equal the grams of compound 1 {} and grams of compound 2 {}".format(sum_of_masses, a[4], a[5]))	
			*/
		}
	}
}
