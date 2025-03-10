import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';

export const routes: Routes = [
  {
    path: 'principal',
    component: PrincipalComponent,
    children: [
       {
         path: 'menu',
         loadComponent: () => import('./contacto/menu/menu.component').then((m) => m.MenuComponent),
       },
       {
         path: 'mision',
         loadComponent: () => import('./contacto/mision/mision.component').then((m) => m.MisionComponent),
       },
       {
         path: 'vision',
         loadComponent: () => import('./contacto/vision/vision.component').then((m) => m.VisionComponent),
       },
       {
         path: 'objetivo',
         loadComponent: () => import('./contacto/objetivo/objetivo.component').then((m) => m.ObjetivoComponent),
       },
      {
        path: '**',
        redirectTo: '/eccs/principal/menu',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/eccs/principal/menu',
    pathMatch: 'full',
  },
];
