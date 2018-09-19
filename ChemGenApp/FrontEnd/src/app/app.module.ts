import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoichiometryFormComponent } from './stoichiometry-form/stoichiometry-form.component';
import { AnswerKeyComponent } from './answer-key/answer-key.component';

@NgModule({
  declarations: [
    AppComponent,
    StoichiometryFormComponent,
    AnswerKeyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
