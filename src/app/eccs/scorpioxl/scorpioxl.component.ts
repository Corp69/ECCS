import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ImportsModule from '@shared/primeng/ImportsModule';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ScorpioXLService } from './services/scorpioxl.service';
import { CommonModule } from '@angular/common';

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

  public frm: FormGroup;

   //variables Html
   public BtnSpinner: boolean = false;
   public EccsBlock:  boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private servicio: ScorpioXLService,
    private messageService: MessageService,
    private routerActive: ActivatedRoute,
    private router: Router


  )
  {
     //Asignamos el ID del regitro por URL
     //this.IdRow = +this.routerActive.snapshot.paramMap.get('id');
       //Formularios del app:
     this.frm = this.fb.group({
      id:                     [-1],
      rfc:                    [, [Validators.required, Validators.minLength(12), Validators.maxLength(13)]],
      pass:                   [, ],
      passpfx:                [, ],
      observaciones:          [, [Validators.minLength(3),  Validators.maxLength(50)]],
      nombrecomercial:        [, [Validators.required, Validators.minLength(3),  Validators.maxLength(50)]],
      aviso_privacidad:       [""],
      celular:                [, [Validators.required, Validators.min(1000000000),  Validators.maxLength(9999999999)]],
      maxcomprobantesmensual: [1,[Validators.required, Validators.minLength(0),   Validators.min(1),  Validators.max(999)]],

      id_estatus:             ["1"],
      id_sat_usocfdi:         ["1"],
      //id_sat_doc_cobro:     [1],
      id_sat_regimenfiscal:   ["3"],
      id_scorpio_tipo_sync:   ["1"]
      
      
    });
  }



  
  //===================================================================================================
  //Crud EMPRESA
  public Nuevo(){
    // mensaje para notificar que esta listo el formulario
    this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Formulario listo.'});
  }

  public async Almacenar(){

  }




  
}
