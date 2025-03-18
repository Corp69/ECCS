import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Observable, Subject, catchError, map, of, tap, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { MdlScorpioXL } from '../Models/MdlScorpioXL';
import { ErroresService } from '@shared/errores.service';
import { StorageService } from '@shared/services/Storage.service';

export interface layoutConfig {

  preset?: string;
  primary?: string;
  surface?: string | undefined | null;
  darkTheme?: boolean;
  menuMode?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScorpioXLService {

  public _config: layoutConfig = {
    preset: 'Aura',
    primary: 'emerald',
    surface: null,
    darkTheme: true,
    menuMode: 'static'
  };

  layoutConfig = signal<layoutConfig>(this._config);
  isDarkTheme = computed(() => this.layoutConfig().darkTheme);


  private configUpdate = new Subject<layoutConfig>();
  private initialized = false;
  //==============================================================================================================
  //modelos:
  public MdlScorpioXL: MdlScorpioXL = new MdlScorpioXL();

  constructor(
      private StorageService: StorageService,
      private http: HttpClient,
      private errores: ErroresService,

    ) {
      effect(() => {
        const config = this.layoutConfig();
        if (config) {
            this.onConfigUpdate();
        }
    });

    effect(() => {
        const config = this.layoutConfig();
        if (!this.initialized || !config) {
            this.initialized = true;

            return;
        }
        this.handleDarkModeTransition(config);
    });
    }

  public Registro(modelo: MdlScorpioXL ): Observable<any> {
    return this.http
      .post(`${environment.baseUrl}auth/prospecto`, modelo)
      .pipe(
        catchError(error => {
          console.log(  error );
          return throwError(this.errores.getErrores(error));
        })
      );
  }





  public onConfigUpdate() {
      this._config = { ...this.layoutConfig() };
      this.configUpdate.next(this.layoutConfig());
  }

   public toggleDarkMode(config?: layoutConfig): void {
      const _config = config || this.layoutConfig();
      if (_config.darkTheme) {
          document.documentElement.classList.add('app-dark');
      } else {
          document.documentElement.classList.remove('app-dark');
      }
  }


  public IniciarSesion(modelo: MdlScorpioXL): Observable<any> {
    return this.http
      .post(`${environment.baseUrl}auth/login`, modelo)
      .pipe(
        catchError(error => {
          return throwError(this.errores.getErrores(error));
        })
      );
  }




  //animacion de cambio de color
  private handleDarkModeTransition(config: layoutConfig): void {
    if ((document as any).startViewTransition) {
        this.startViewTransition(config);
    } else {
        this.toggleDarkMode(config);
        this.onTransitionEnd();
    }
}

    private startViewTransition(config: layoutConfig): void {
      const transition = (document as any).startViewTransition(() => {
          this.toggleDarkMode(config);
      });

      transition.ready
          .then(() => {
              this.onTransitionEnd();
          })
          .catch(() => {});
    }
    public transitionComplete = signal<boolean>(false);

    private onTransitionEnd() {
      this.transitionComplete.set(true);
      setTimeout(() => {
          this.transitionComplete.set(false);
      });
    }

}
