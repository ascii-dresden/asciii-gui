import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeComponent } from './font-awesome.component';
import { FontAwesomeBoolComponent } from './font-awesome-bool.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FontAwesomeComponent,
    FontAwesomeBoolComponent
  ],
  exports: [
    FontAwesomeComponent,
    FontAwesomeBoolComponent
  ]
})
export class FontAwesomeModule { }
