import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule
  ],
  declarations: [ProjectsComponent]
})
export class ProjectsModule { }
