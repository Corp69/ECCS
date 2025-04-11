import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// shared
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
//interface
import { ConfirmacionMensaje } from './interface/confirmacion';
//servicios
import { LoginService } from './services/login.service';
import { StorageService } from '@shared/services/Storage.service';
//primeNG
import { Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MessageService } from 'primeng/api';
import { CargaComponent } from '@shared/pages/modales/carga/carga.component';

import ImportsModule from '@shared/primeng/ImportsModule';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [

            NgOptimizedImage,
            //Componentes shared
             //shared
            ConfirmacionComponent,
            CargaComponent,
            ImportsModule,

            //angular
            CommonModule,
            ReactiveFormsModule,
            FormsModule,
          ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;
  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: '', mensaje: '', detalle: '' };
  // variable que bloquea la vista
  public EccsBlock: boolean  = false;

  //constructor
  constructor(
    private StorageService: StorageService,
    public servicio: LoginService,
    private fb: FormBuilder,
    private router: Router ) {
      // document.documentElement.classList.add('app-dark');
     // Inicializar el formulario
     this.formLogin = this.fb.group({
      usuario: [null, [Validators.required, Validators.minLength(4)]],
      pass: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  // iniciar sesion
  public onSave() {
    //bloqueamos la pantalla
    this.EccsBlock = true;

    this.servicio.IniciarSesion(this.formLogin.value).subscribe(resp => {
      // validamos con un switch
      switch (resp.Success) {
        case true:
          this.StorageService.setItem("token",       resp.token );
          this.StorageService.setItem("id_usuario",  resp.Response.id_usuario );
          // let sond = new Audio();
          // sond.src = '../assets/login/AriesIntro.mp4'
          // sond.load();
          // sond.play();
          this.EccsBlock = false;
          this.router.navigate(['/Scorpio/principal']);
        break;
        case false:
          //============================================================
          // Seteamos mnsj
          this.ConfirmacionMsjMdl.msjTipo = 3;
          this.ConfirmacionMsjMdl.titulo  = "ECCS: Info"; //resp.Titulo;
          this.ConfirmacionMsjMdl.mensaje = "Al Iniciar Session";
          this.ConfirmacionMsjMdl.detalle = "Tu acceso se ha limitado: revisa tus credenciales se han correctas y  verifica que tu usuario este activo";
          this.EccsBlock  = false;
          this.ConfirmacionMdl = true;
        break;
        default:

        break;
      }
    });
    this.ConfirmacionMdl = false;
  }

  //inicializamos los valores del formulario
  public ngOnInit() {
    this.servicio.onConfigUpdate();
  }


public toggleDarkMode() {
  this.servicio.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
}


}
