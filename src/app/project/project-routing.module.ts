import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProjectComponent } from '@app/project/project.component';

const routes: Routes = [
  { path: ':name', component: ProjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
