import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: PrincipalComponent,
    children: [
       {
         path: 'login',
         loadComponent: () =>
           import('./login/login.component').then((m) => m.LoginComponent),
       },
       {
         path: 'registro',
         loadComponent: () =>
           import('./registro/registro.component').then((m) => m.RegistroComponent),
       },
      {
        path: '**',
        redirectTo: '/auth/registro',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/auth/registro',
    pathMatch: 'full',
  },
];
