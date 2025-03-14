import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// shared
import { MdleliminarComponent } from '@shared/pages/modales/mdleliminar/mdleliminar.component';
import { TbDomicilioService } from './services/Tbdomicilio.service';

//prime ng
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CommonModule } from '@angular/common';
import { BlockUIModule } from 'primeng/blockui';
import {MessageService} from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'aries-table-domicilios',
  standalone: true,
  imports: [
      //shared
      MdleliminarComponent,
      //angular
      CommonModule,
      // prime ng
      DividerModule,
      TableModule,
      MessageModule,
      CardModule,
      ButtonModule,
      BlockUIModule,
      ToastModule,
      KeyFilterModule
  ],
  providers: [MessageService],
  templateUrl: './tbdomicilios.component.html',
  styleUrl: './tbdomicilios.component.scss'
})
export class TbdomiciliosComponent implements OnInit, OnChanges  {

  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;
   //==============================================================================================================
   // Modal: mensaje Confirmacion falso para no cargar la modal
   public mdleliminar: boolean = false;
   // variables entre componentes
   @Input()
   public _tabla: String = "";
   
   @Input()
   public fn:     String = "";
  
   @Input()
   public sc:     String = "";
   
   public _id:    number = -1;

   @Input() reloadTrigger: boolean = false;

   // retorna la busqueda del servicio
   @Output() _frm = new EventEmitter<any>();

  //tabla
  public DataSource: any;
  public DataSourceColumnas: any;

 // constructor
 constructor(private servicio: TbDomicilioService,  private route: ActivatedRoute,  private messageService: MessageService, ){ }

 public ngOnChanges(changes: SimpleChanges): void {
     if (this.reloadTrigger == true) {
       this.route.params.subscribe(params => {
         if (+params['id'] > -1) {
           this._id = +params['id'];
           this.servicio.Buscar( this.sc , this.fn, this._id ).subscribe(resp => {
            this.DataSource = resp.Detalle._app_domicilio;
             //this.DataSourceColumnas = Object.keys(this.DataSource[0]);
           });
         }
         else{
           this.DataSource = [];
           //this.DataSourceColumnas = [];
         }
       });
     }
     this.reloadTrigger = false;
 }

 public ngOnInit(): void {
     this.route.params.subscribe(params => {
       if (+params['id'] > -1) {
         this._id = +params['id'];
         this.servicio.Buscar( this.sc , this.fn, this._id ).subscribe(resp => {
          this.DataSource = resp.Detalle._app_domicilio;
           //this.DataSourceColumnas = Object.keys(this.DataSource[0]);
         });
       }
       else{
         this.DataSource = [];
         this.DataSourceColumnas = [];
       }
     });
 }

 //public Obtenervalor = (obj: any): any[] => { return Object.values(obj); }
 public  ModificarRow( args: any ){
   this._frm.emit( args );
 }

 public eliminarRow( args: any ){
   this._id = args.id;
   this.mdleliminar = true;
   this.Ariesblocked = true;
 }

 //==============================================================================================================
 // metodo generico de busqueda...
 public eliminacion( response: any) {
     // cargamos al objeto a buscar
   this.mdleliminar  = false;
   // recargamos la data
   switch ( response ) {
     case false:
       this.DataSource = [];
       this.DataSourceColumnas = [];
       break;
     default:
       this.route.params.subscribe(params => {
         if (+params['id'] > -1) {
           this._id = +params['id'];
           this.messageService.add({key: 'tc', severity:'info', summary: 'Info', detail: 'Acción: correcta !'});
           this.servicio.Buscar( this.sc, this.fn, this._id ).subscribe(resp => {
             this.DataSource = resp.Detalle._app_domicilio;
             //this.DataSourceColumnas = Object.keys(this.DataSource[0]);
           });
         }
         else{
           this.DataSource = [];
           this.DataSourceColumnas = [];
         }
       });
       break;
   }
   this.Ariesblocked = false;
 }

 }
