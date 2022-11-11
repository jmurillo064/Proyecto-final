import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    //redirectTo: 'login',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  //   canActivate: [IntroGuard]
  // },
  // {
  //   path: 'registro',
  //   loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule),
  //   canActivate: [IntroGuard]
  // },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [AutoLoginGuard]
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./pages/ayuda/ayuda.module').then( m => m.AyudaPageModule),
    canActivate: [AutoLoginGuard]
  },
  {
    path: 'procesamiento',
    loadChildren: () => import('./pages/procesamiento/procesamiento.module').then( m => m.ProcesamientoPageModule),
    canActivate: [AutoLoginGuard]
  },
  {
    path: 'administrar-usuarios',
    loadChildren: () => import('./pages/administrar-usuarios/administrar-usuarios.module').then( m => m.AdministrarUsuariosPageModule),
    canActivate: [AutoLoginGuard]
  },
  {
    path: 'resultado',
    loadChildren: () => import('./pages/resultado/resultado.module').then( m => m.ResultadoPageModule)
  },
  {
    path: 'reportes-admin',
    loadChildren: () => import('./pages/reportes-admin/reportes-admin.module').then( m => m.ReportesAdminPageModule),
    canActivate: [AutoLoginGuard]
  },
  {
    path: 'reportes-user',
    loadChildren: () => import('./pages/reportes-user/reportes-user.module').then( m => m.ReportesUserPageModule),
    canActivate: [AutoLoginGuard]
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./pages/recuperar-password/recuperar-password.module').then( m => m.RecuperarPasswordPageModule),
    canActivate: [IntroGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [IntroGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
