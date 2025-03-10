import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';


import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {

    providers: [
  
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideAnimationsAsync(),
      provideRouter(routes, withViewTransitions({ skipInitialTransition: true, onViewTransitionCreated(transitionInfo) { }, })),
      importProvidersFrom(BrowserModule, BrowserAnimationsModule, ReactiveFormsModule),
      provideHttpClient(withFetch()),
      provideClientHydration(),
      provideServiceWorker('ngsw-worker.js', { enabled: !isDevMode(), registrationStrategy: 'registerWhenStable:30000' }), 
    
  
      
  ]
};
