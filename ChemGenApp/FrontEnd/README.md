# FrontEnd

## Installation Steps

1. Create a folder named **ChemGenApp** and navigate to it using either Git Bash or Windows Command Prompt. *I would recommend doing all the installs through Command Prompt because it will give a status bar for the download and Git Bash will not. When running the web server, I would recommend Git Bash.*
2. In the **ChemGenApp** folder, run the command **npm i -g @angular/cli@6.2.1**.
3. In the **ChemGenApp** folder, run the command **ng new FrontEnd --style=scss**. The *style* argument is important
4. Navigate to the **FrontEnd** folder that was generated in the previous command.
5. In the **FrontEnd** folder, run the command **npm install npm**. *This will update Node Package Manager, **not** Node.js*
6. In the **FrontEnd** folder, run the command **npm install bootstrap@4.1.3**.
7. In the **FrontEnd** folder, run the command **npm install jquery@3.3.1**.
8. In the **FrontEnd** folder, run the command **npm install popper.js@1.14.4**.
9. In the **FrontEnd** folder, run the command **npm install @ng-bootstrap/ng-bootstrap@3.2.0**.
10. In Git Bash, go to the **FrontEnd** folder and run the command **ng serve** and then use your browser to navigate to **localhost:4200** to test installation.

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
