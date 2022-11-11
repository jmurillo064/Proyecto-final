import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'login',
        loadChildren: () => import('./../../pages/login/login.module').then( m => m.LoginPageModule),
        //canActivate: [IntroGuard]
      },
      {
        path: 'registro',
        loadChildren: () => import('./../../pages/registro/registro.module').then( m => m.RegistroPageModule),
        //canActivate: [IntroGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
