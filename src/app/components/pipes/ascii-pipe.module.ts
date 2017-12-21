import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DisplayNamePipe } from './display-name.pipe';
import { TemperaturePipe } from './temperature.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DisplayNamePipe,
    TemperaturePipe
  ],
  exports: [
    DisplayNamePipe,
    TemperaturePipe
  ]
})
export class AsciiPipeModule {}
