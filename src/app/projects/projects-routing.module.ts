import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {ProjectsComponent} from './projects.component';

const routes: Routes = [
  { path: ':year', component: ProjectsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
