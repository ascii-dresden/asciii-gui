import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { MatematComponent } from './matemat.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [MatematComponent]
})
export class MatematModule {}
