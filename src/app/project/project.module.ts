import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule
  ],
  declarations: [ProjectComponent]
})
export class ProjectModule { }
