import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoolPipe } from './bool.pipe';
import { TemperaturePipe } from './temperature.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TemperaturePipe,
    BoolPipe
  ],
  exports: [
    TemperaturePipe,
    BoolPipe
  ]
})
export class AsciiPipeModule { }
