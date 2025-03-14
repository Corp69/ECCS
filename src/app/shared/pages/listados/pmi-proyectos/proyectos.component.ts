//angular
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

// prime NG
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { BlockUIModule } from 'primeng/blockui';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';

//servicio

import { ConfirmacionMensaje, list } from '@shared/interfaces/Aries';
import { MdleliminarComponent } from '@shared/pages/modales/mdleliminar/mdleliminar.component';
import { ConfirmacionComponent } from '@shared/pages/modales/confirmacion/confirmacion.component';
import { TableModule } from 'primeng/table';
import { LstproyectoService } from './services/lstproyecto.service';

export interface Product {
  id?:string;
  code?:string;
  name?:string;
  description?:string;
  price?:number;
  quantity?:number;
  inventoryStatus?:string;
  category?:string;
  image?:string;
  rating?:number;
}

@Component({
  selector: 'app-list-proyectos',
  standalone: true,
  imports: [
    //angular
    CommonModule,
    ReactiveFormsModule,

    //prime NG
    DividerModule,
    MessageModule,
    DropdownModule,
    CardModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    ButtonModule,
    BlockUIModule,
    ToastModule,
    CalendarModule,
    TableModule,
    
    //shared
    MdleliminarComponent,
    ConfirmacionComponent,
  ],
  providers: [
  
    MessageService,
    DatePipe
  
  ],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss',
})
export default class ProyectosComponent implements OnInit {
  // variables entre componentes
  @Input()
  public fn: string = '';
  @Input()
  public sc: string = '';
  @Input()
  public tabla: string = '';
  

  // busqueda
  public busqueda: string = "";

  //el id del registro a eliminar
  public _id: number = -1;

  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public mdleliminar: boolean = false;

  // listados
  public lstEstus: list[] = [];

  // bloqueamos el boton
  public BtnSpinner: boolean = false;
  // variable que bloquea la vista
  public Ariesblocked: boolean = false;
  
  public reloadTrigger: boolean = false;

  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;
  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };


  public products: any = [];


  //Formularios del app:
  public frm: FormGroup = this.fb.group({
    _fecha_inicio: [ null,[Validators.required, Validators.minLength(1)]],
    _fecha_final:  [ null,[Validators.required, Validators.minLength(1)]],
    _id_: [ null,[Validators.required, Validators.minLength(1)] ]
  });

  constructor(
    private fb: FormBuilder,
    private servicio: LstproyectoService,
    private DatePipe: DatePipe,
    private messageService: MessageService,
    private router: Router
  ) {}
  public ngOnInit(): void {
    //listado 
    this.servicio.Lstestatus().subscribe((resp) => { this.lstEstus= resp.Detalle; });
  
  }

  //btn nuevo
  public Nuevo() {
   
    this.frm.controls['_fecha_inicio'].setValue( new Date() );
    this.frm.controls['_fecha_final'].setValue(  new Date());
    this.frm.controls['_id_'].setValue(null);

  }


  //btn buscar
  public  buscar() {
    //=======================================================================================
    //conversion de fecha
    this.frm.controls['_fecha_inicio'].setValue(this.DatePipe.transform( this.frm.value._fecha_inicio, "dd/MM/yyyy"));
    this.frm.controls['_fecha_final'].setValue(this.DatePipe.transform(  this.frm.value._fecha_final, "dd/MM/yyyy"));
    this.frm.controls['_id_'].setValue(parseInt(this.frm.value._id_));
    // bloqueamos el boton
    this.BtnSpinner   = true;
    // bloqueamos pantalla
    this.Ariesblocked = true;
            this.servicio.Buscar( this.sc, this.fn, this.frm.value ).subscribe(resp => {
              switch ( resp.IdMensj ) {
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
                  //validamos que no venga vacio
                  if ( resp.Detalle._app_lst_cliente.lst.length == 0 ) {
                       // mensaje para verificar la captura de la direccion del sat
                    this.messageService.add(
                      {
                        key: 'tc', 
                        severity:'info', 
                        summary: 'info',
                        detail: 'Busqueda realizada, no hay registros.'
                      });
                      //registros dejamos en vacio 
                      this.DataSource   = [];
                    
                  }
                  else{
                    this.DataSource    = resp.Detalle._app_lst_cliente.lst;
                   
                  }
                  // desbloqueamos la pantalla
                  this.Ariesblocked     = false;
                  break;
              }
              this.BtnSpinner    = false;
            });
       this.reloadTrigger   = false;
       //=============================
       // busqueda 
       this.busqueda = " Busqueda realizada: " +  this.frm.value._fecha_inicio + " al " +  this.frm.value._fecha_final;
       //===========================================
       // reiniciamos el formulario 
       this.frm.controls['_id_'].setValue( null );
       this.frm.controls['_fecha_inicio'].setValue( null );
       this.frm.controls['_fecha_final'].setValue(  null );

  }

  //======================================
  // variables de tabla
    //tabla
    public DataSource: any = [];
  //=======================================
 // metodo generico de busqueda...
 public eliminacion( response: any) {
      // cargamos al objeto a buscar
      this.mdleliminar  = false;
      // recargamos la data
      switch ( response ) {
        case false:
          this.messageService.add(
            {
              key: 'tc', 
              severity:'info', 
              summary: 'info',
              detail: 'Eliminación, Cancelada'
            });
          break;
        default:
          this.messageService.add(
            {
              key: 'tc', 
              severity:'success', 
              summary: 'Registro',
              detail:  'Eliminado: Correctamente!'
            });
            this.servicio.RecargarBuscar( this.sc, this.fn ).subscribe(resp => {
              switch ( resp.IdMensj ) {
                case 3:
                  //============================================================
                  this.ConfirmacionMsjMdl.msjTipo = 2; //resp.IdMensj;
                  this.ConfirmacionMsjMdl.titulo  = "Aries: Info"; //resp.Titulo;
                  this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
                  this.ConfirmacionMsjMdl.detalle = resp.Solucion;
                  this.ConfirmacionMdl = true;
                  break;
                case 2:
                  //============================================================
                  this.ConfirmacionMsjMdl.msjTipo = resp.IdMensj;
                  this.ConfirmacionMsjMdl.titulo  = 'Aries: Info'; //resp.Titulo;
                  this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
                  this.ConfirmacionMsjMdl.detalle = resp.Detalle;
                   // mostramos el resultado de la informacion
                   this.ConfirmacionMdl  = true;
                  break;
                default:
                  //============================================================
                  //validamos que no venga vacio
                  if ( resp.Detalle._app_lst_cliente.lst.length == 0 ) {
                       // mensaje para verificar la captura de la direccion del sat
                    this.messageService.add(
                      {
                        key: 'tc', 
                        severity:'info', 
                        summary: 'info',
                        detail: 'Busqueda realizada, no hay registros.'
                      });
                  }
                  else{
                    this.DataSource         = resp.Detalle._app_lst_cliente.lst;
                  }
                  break;
              }
            });
        break;
      }
      // cancelamos el stop 
      this.Ariesblocked = false;
      // reiniciamos el id del registro que se elimino
      this._id = -1;
}
 
 public eliminarRow( id: number ){
  this._id = id;
  this.mdleliminar = true;
  this.Ariesblocked = true;
}



public exportExcel() {
  if ( this.DataSource.length == 0 ) {
    // mensaje para verificar la captura de la direccion del sat
     this.messageService.add(
       {
         key: 'tc', 
         severity:'info', 
         summary: 'Advertencia:',
         detail: 'No se pudo generar un excel, no hay registros'
       });
    }
else
   {  
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet( this.DataSource );
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "products");
      });
    }
}


public saveAsExcelFile(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  });
}




public selectRowProyectos( id: number ){
  this.router.navigate([ `/ControlPMI/Proyecto/${ id }`]);
}


public selectRowCronograma( id: number ){
  this.router.navigate([ `/ControlPMI/Cronograma/${ id }`]);
}











}
