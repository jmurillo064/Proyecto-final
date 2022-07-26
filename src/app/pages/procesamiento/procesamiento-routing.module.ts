import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcesamientoPage } from './procesamiento.page';

const routes: Routes = [
  {
    path: '',
    component: ProcesamientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcesamientoPageRoutingModule {}
