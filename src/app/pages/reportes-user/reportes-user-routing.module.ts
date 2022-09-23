import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesUserPage } from './reportes-user.page';

const routes: Routes = [
  {
    path: '',
    component: ReportesUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesUserPageRoutingModule {}
