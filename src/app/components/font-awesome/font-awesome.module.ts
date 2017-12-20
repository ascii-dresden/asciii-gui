import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeComponent } from './font-awesome.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FontAwesomeComponent],
  exports: [FontAwesomeComponent]
})
export class FontAwesomeModule { }
