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
        path: 'scorpioxl',
        title: 'ECCS - Scorpio XL - 2025',
        loadComponent: () => import('./scorpioxl/scorpioxl.component').then((m) => m.ScorpioxlComponent),
      },

      {
        path:  'arieserp',
        title: 'ECCS - AriesERP -  2025',
        loadComponent: () => import('./arieserp/arieserp.component').then((m) => m.ArieserpComponent),
      },

      {
        path: 'ela',
        title: 'ECCS - ELA | OpenIA - 2025',
        loadComponent: () => import('./ela/ela.component').then((m) => m.ElaComponent),
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
