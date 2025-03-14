import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component,  Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// shared

import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
import { MdlDomicilio } from './models/MdlDomicilio';
import { DomicilioService } from './services/domicilio.service';
import { ConfirmacionMensaje } from './interface/Domicilio';
import { list } from '@shared/interfaces/Aries';
import { TbdomiciliosComponent } from '@shared/pages/tablas/tbdomicilios/tbdomicilios.component';
// prime NG
import { DividerModule } from 'primeng/divider';
import { MessageModule} from 'primeng/message';
import { ProgressSpinnerModule} from 'primeng/progressspinner';
import { CardModule} from 'primeng/card';
import { DialogModule} from 'primeng/dialog';
import { TooltipModule} from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { KeyFilterModule } from 'primeng/keyfilter';
import { BlockUIModule } from 'primeng/blockui';
import { DropdownModule } from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'aries-domicilios',
  standalone: true,
  imports: [

    //angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //shared
    ConfirmacionComponent,
    TbdomiciliosComponent,
    //prime NG
    KeyFilterModule,
    InputGroupModule,
    InputGroupAddonModule,
    DividerModule,
    MessageModule,
    DropdownModule,
    CardModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    ButtonModule,
    RippleModule,
    BlockUIModule,
    ToastModule,
    DividerModule
  ],
  providers: [MessageService],
  templateUrl: './domicilios.component.html',
  styleUrl: './domicilios.component.scss'
})
export default class AppDomiciliosComponent implements OnInit {

  // variables entre componentes
  @Input()
  public tabla: String = "";

  @Input()
  public tablaCampo: string = "";
  
  @Input()
  public fn:  string = "";

  @Input()
  public sc:  string = "";

  public _id: number = -1;


  public reloadTrigger: boolean = false;

  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;
  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };

  // listados
  public lstEstados:   list[] = [];
  public lstMunicipio: list[] = [];
  public lstLocalidad: list[] = [];
  public lstColonia:   list[] = [];


  // bloqueamos el boton
  public BtnSpinner: boolean   = false;
   // variable que bloquea la vista
   public Ariesblocked: boolean  = false;

  //modelos:
  public MdlDomicilio: MdlDomicilio = new MdlDomicilio();

  // FORMULARIO
    //==============================================================================================================
  //Formularios del app:
  public frmDomicilio: FormGroup = this.fb.group({
    id:           [-1],
    calle:   [, [Validators.required, Validators.minLength(3)]],
    num_ext: [, [Validators.required, Validators.minLength(1)]],
    num_int: [, ],
    cp:      [, [Validators.required, Validators.minLength(5)]],

    id_estado:                  [null],
    id_municipio:               [null],
    id_localidad:               [null],
    id_colonia:                 [null],
    activo:                     [true],
  });

  constructor(
      private fb: FormBuilder,
      private servicio: DomicilioService,
      private messageService: MessageService,
      private route: ActivatedRoute )
  {
    this.route.params.subscribe(params => {
      if (+params['id'] > -1) {
        this._id = +params['id'];
      }
    });
  }

  /**
   * cargamos los estados disponibles al pais 146 mexico
   */
  public ngOnInit(): void {
    this.servicio.lstEstado().subscribe(resp => { this.lstEstados = resp.Detalle });
    //inyectamos el campo por la columna
    this.frmDomicilio.addControl( this.tablaCampo, this.fb.control( this._id));
  }

  /**
   *
   * @param args filtra por estado seleccionado filtra municipio y localidad
   */
  public onEstado( args: any){
    this.frmDomicilio.controls['id_localidad'].setValue(this.frmDomicilio.value.id_estatus = null );
    this.frmDomicilio.controls['id_municipio'].setValue( this.frmDomicilio.value.id_tipo   = null );
    this.servicio.lstDomicilios( "municipio", args.value ).subscribe(resp => { this.lstMunicipio = resp.Detalle });
    this.servicio.lstDomicilios( "localidad", args.value ).subscribe(resp => { this.lstLocalidad = resp.Detalle });
  }

  /**
   *
   * @param args filtra por el codigo postal a la colonia
   */
  public onCp( value: number | String){
    switch ( value.toString().length ) {
      case 5:
      this.servicio.lstCodigoPostal( value.toString()).subscribe(resp => { this.lstColonia = resp.Detalle;});
      break;
      default:
        this.lstColonia = null;
        this.frmDomicilio.controls['id_colonia'].setValue(this.frmDomicilio.value.id_colonia = null );
      break;
    }
  }

  // nuevo registro resetea formulario
  public Nuevo(){
    this.lstMunicipio = [];
    this.lstLocalidad = [];
    this.lstColonia   = [];
        // reiniciamos el formulario
        this.frmDomicilio.setValue(this.MdlDomicilio);
        this.frmDomicilio.controls[this.tablaCampo].setValue( this._id );

    // mensaje para verificar la captura de la direccion del sat
    this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Carga lista, por favor ingresa un domicilio nuevo.'});


  }

  // cargamos la data del formulario
  public Modificar( arg: any){

    // mensaje para verificar la captura de la direccion del sat
    this.messageService.add({key: 'tc', severity:'info', summary: 'info', detail: 'Confirma dirección para enviarla al SAT'});

    this.frmDomicilio.controls['id'].setValue( arg.id );
    this.frmDomicilio.controls[this.tablaCampo].setValue( this._id );
    this.frmDomicilio.controls['calle'].setValue(        arg.calle );
    this.frmDomicilio.controls['cp'].setValue(           arg.cp );
    this.frmDomicilio.controls['num_ext'].setValue(      arg.num_ext );
    this.frmDomicilio.controls['num_int'].setValue(      arg.num_int );
    this.frmDomicilio.controls['activo'].setValue(       true );
    // reseteamos los listados de SAT
    this.lstColonia    = [];
    this.lstLocalidad  = [];
    this.lstMunicipio  = [];
  }

  //almacena informacion
  public Almacenar = () => {
      // ?=========================================================================
       //validamos que no este el mensaje en pantalla
      this.ConfirmacionMdl  = false;
      // bloqueamos el boton
      this.BtnSpinner   = true;
      // bloqueamos pantalla
      this.Ariesblocked = true;
      //===============================
      this.servicio.almacenar( this.tabla, this.frmDomicilio.value).subscribe(resp => {
        switch (resp.IdMensj) {
          case 3:
            //============================================================
            this.ConfirmacionMsjMdl.msjTipo = 2; //resp.IdMensj;
            this.ConfirmacionMsjMdl.titulo  = "Aries: Info"; //resp.Titulo;
            this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
            this.ConfirmacionMsjMdl.detalle = resp.Solucion;
            this.ConfirmacionMdl = true;
            // desbloqueamos la pantalla
            this.Ariesblocked = false;
            break;
          case 2:
            //============================================================
            this.ConfirmacionMsjMdl.msjTipo = resp.IdMensj;
            this.ConfirmacionMsjMdl.titulo  = 'Aries: Info'; //resp.Titulo;
            this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
            this.ConfirmacionMsjMdl.detalle = resp.Detalle;
             // mostramos el resultado de la informacion
             this.ConfirmacionMdl  = true;
            // desbloqueamos la pantalla
            this.Ariesblocked = false;
            break;
          default:
            this.reloadTrigger = true;
            //============================================================
            this.ConfirmacionMsjMdl.msjTipo = resp.IdMensj;
            this.ConfirmacionMsjMdl.titulo  = 'Aries: Info'; //resp.Titulo;
            this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
            this.ConfirmacionMsjMdl.detalle = resp.Detalle;
            //============================================================
            // instanciamos elmismo formulario para actualizar
            this.frmDomicilio.setValue(this.frmDomicilio.value);
            // agregamos el ID para generar la actualizacion
            this.frmDomicilio.controls['id'].setValue(parseInt(resp.Id));
            // mostramos el resultado de la informacion
            this.ConfirmacionMdl  = true;
            // desbloqueamos la pantalla
            this.Ariesblocked     = false;
            break;
        }
        this.BtnSpinner    = false;
      });
      this.reloadTrigger   = false;
  }

}
