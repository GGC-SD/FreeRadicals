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
}
