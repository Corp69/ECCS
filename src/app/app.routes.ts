import { Routes } from '@angular/router';

export const routes: Routes = [
  //========================================================================
  //= Login - Modulo  
  //========================================================================
    {
      path: 'login',
      loadChildren: () => import('./login/login.routes').then((m) => m.routes),
    },
  //========================================================================
  // CONTACTO - Modulo  
  //========================================================================
    {
      path: 'eccs',
      loadChildren: () => import('./eccs/eccs.routes').then((m) => m.routes),
    },
  // {
  //   path: 'licencia',
  //   loadComponent: () => import('./ela/licencia/licencia.page').then( m => m.LicenciaPage)
  // },
  {
    path: '**',
    redirectTo: '/eccs/principal/menu',
    pathMatch:  'full',
  }
];
  