# FrontEnd Installation instructions.

## Installation instructions
NOTE 1: Make sure that you've completed the Node.js and npm install steps, as they are necessary for this stage.
NOTE 2: this is for the first time on a particular computer, and works across any number of installations, as it uses global installation instructions:

1. Open the Command Prompt
2. Navigate to the ChemGenApp folder
3. run npm i -g @angular/cli@6.2.1
4. extract the FrontEndInstall.zip file and copy the contents into the FrontEnd folder - DO NOT LET IT OVERWRITE ANY OF THE EXISTING FILES - The existing files already have all of the information they need to work, they just need the angular information from the zip.
5. navigate to the FrontEnd folder
6. run ng serve

NOTE 3: this might not mean much, but running ng serve is generally best done from git bash instead of the cmd.

The server should be up and running on localhost:4200 at this point.

# FrontEnd -- Default README.md of Angular Apps

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
