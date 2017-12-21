import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeBoolComponent } from './font-awesome-bool.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FontAwesomeBoolComponent
  ],
  exports: [
    FontAwesomeBoolComponent
  ]
})
export class FontAwesomeModule {}
