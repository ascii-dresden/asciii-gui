import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatematComponent } from './matemat.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [MatematComponent]
})
export class MatematModule { }
