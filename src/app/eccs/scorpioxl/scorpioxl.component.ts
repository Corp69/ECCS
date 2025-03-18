import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ImportsModule from '@shared/primeng/ImportsModule';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ScorpioXLService } from './services/scorpioxl.service';
import { CommonModule } from '@angular/common';
import { MdlScorpioXL } from './Models/MdlScorpioXL';

@Component({
  selector: 'app-scorpioxl',
  imports: [    
    //prime ng 
    ImportsModule,
    //angular
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  templateUrl: './scorpioxl.component.html',
  styleUrl: './scorpioxl.component.css'
})
export class ScorpioxlComponent {

   //==============================================================================================================
  //modelos:
  public MdlScorpioXL: MdlScorpioXL = new MdlScorpioXL();
  public frm: FormGroup;

   //variables Html
   public BtnSpinner:   boolean = false;
   public EccsBlock:    boolean = false;
   public visibleForm:  boolean = true;
  
  constructor(
    private fb: FormBuilder,
    private servicio: ScorpioXLService,
    private messageService: MessageService,
    private router: Router


  )
  {
     //Asignamos el ID del regitro por URL
     //this.IdRow = +this.routerActive.snapshot.paramMap.get('id');
       //Formularios del app:
       this.frm = this.fb.group({
        rfc:                  [,       [Validators.required, Validators.minLength(10),   Validators.maxLength(15)]],
        nombre_comercial:     [,       [Validators.required, Validators.minLength(5),    Validators.maxLength(50)]],
        ext_tel:              ['+52'],
        telefono:             [,       [Validators.required, Validators.min(1000000000), Validators.max(9999999999) ]],
        correo:               [,       [Validators.required, Validators.minLength(10),    Validators.maxLength(70)]],
        //llaves foraneas
        id_eccs_status:       [ 4 ]
      });
  }



  
  //===================================================================================================
  //Home EMPRESA
  public Home(){
    // mensaje para notificar que esta listo el formulario
    this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'HOME.'});
    // Navegar a la ruta '/home'
    this.router.navigate([`/eccs/principal/menu`]);
  }

  //===================================================================================================
  //Crud EMPRESA
  public Nuevo(){
    // mensaje para notificar que esta listo el formulario
    this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo.'});
  }

  public async Almacenar(){
    this.EccsBlock = true;
    this.servicio.Registro( this.frm.value ).subscribe(resp => {
        // validamos con un switch
        switch (resp.Success) {
          case false:
            this.messageService.add({
              key: 'tc',
              severity: 'error',
              summary: resp.Mensaje,
              detail: 'error al enviar datos.',
            });

            this.EccsBlock   = false;
            this.visibleForm = false;

            break;
          default:
            
            this.messageService.add({
              key: 'tc',
              severity: 'success',
              summary: resp.Mensaje,
              detail: 'Información enviada con exito.',
            });
  
            
            this.visibleForm = false;
            this.EccsBlock   = false;
            break;
        }
  })

}




  
}
