import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { buscarService } from './services/buscar.service';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'mdl-buscar-cliente',
  standalone: true,
  imports: [
  
    ReactiveFormsModule,
    CommonModule,
    
    
    
    //prime ng
    DialogModule,
    ButtonModule,
    TooltipModule,
    CardModule,
    DropdownModule,
    ProgressSpinnerModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    DividerModule,
    BlockUIModule
  ], 
  providers: [MessageService],
  templateUrl: './mdlbuscarcliente.component.html',
  styleUrl: './mdlbuscarcliente.component.scss'
})
export default class MdlbuscarclienteComponent implements OnInit {
 //=================================================================================================================
 // variables entre componentes
 @Input()
 public tabla: String = "";
 // retorna la busqueda del servicio
 @Output() BusqedaJson = new EventEmitter<any>();
 //=================================================================================================================
 //variables para mostrar tabla
 public data: [] =[];
 
 //================================
 // variable que bloquea la vista 
  public Ariesblocked: boolean  = false;
 
 
 constructor( 
  private fb: FormBuilder, 
  private messageService: MessageService,
  private servicio: buscarService) { }


  public ngOnInit(): void {
  
  }
 
  // formulario
 public frm: FormGroup = this.fb.group({ 
  descripcion: [, [Validators.required, Validators.minLength(3)]] 

});

 //metodo que realiza la busqueda
 public buscarinfo = () => {
 //=======================================================================================
  this.servicio.Buscar( this.frm.value ).subscribe(resp => {
    switch (resp.Detalle.length) {
      //=======================================================================================
      case 0:
        // this.DataSource = [];
        // this.DataSourceColumnas = [];
        break;
      //=======================================================================================
      case null:
        // this.DataSource = [];
        // this.DataSourceColumnas = [];
        break;
      //=======================================================================================
      case undefined:
        // this.DataSource = [];
        // this.DataSourceColumnas = [];
        break;
      //=======================================================================================
      default:
        this.data = resp.Detalle;
        //this.data = Object.keys(this.DataSource[0]);
        this.frm.setValue(this.frm.value);
        break;
      //=======================================================================================
    }
  });



}


}
