import { Component, EventEmitter, Input,  Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
//shared
import { NombreService } from './services/nombre.service';
//prime 
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'nombresMDL',
  standalone: true,
  imports: [
      //angular
      CommonModule,
      ReactiveFormsModule,
      //prime 
      CardModule,
      DividerModule,
      TableModule,
      ButtonModule,
      KeyFilterModule,
      MessageModule
  ],
  templateUrl: './nombres.component.html',
  styleUrl: './nombres.component.scss'
})
export class NombresComponent {
 // formulario
 public frm: FormGroup = this.fb.group({ descripcion: [, [Validators.required, Validators.minLength(3)]] });
 //tabla   
 public DataSource: any;
 public DataSourceColumnas: any;
 //=================================================================================================================
 // variables entre componentes
 @Input()
 public tabla: String = "";
 // retorna la busqueda del servicio
 @Output() BusqedaJson = new EventEmitter<any>();
 //=================================================================================================================
 constructor( private fb: FormBuilder, private servicio: NombreService) { }
  
 //metodo que realiza la busqueda
 public buscarinfo = () => {
   //=======================================================================================
   this.servicio.Buscar(this.tabla, this.frm.value.descripcion).subscribe(resp => {
     switch (resp.Detalle.length) {
       //=======================================================================================
       case 0:
         this.DataSource = [];
         this.DataSourceColumnas = [];
         break;
       //=======================================================================================
       case null:
         this.DataSource = [];
         this.DataSourceColumnas = [];
         break;
       //=======================================================================================
       case undefined:
         this.DataSource = [];
         this.DataSourceColumnas = [];
         break;
       //=======================================================================================
       default:
         this.DataSource = resp.Detalle;
         this.DataSourceColumnas = Object.keys(this.DataSource[0]);
         this.frm.setValue(this.frm.value);
         break;
       //=======================================================================================
     }
   });
 }
 //==============================================================================================================
 // funcionalidad de la tabla:
 public onSelectionChange(args: any) {
   this.BusqedaJson.emit(args[0]);
   this.DataSource = null;
   this.frm.controls['descripcion'].setValue('');
 }

 /**
  * 
  * @param obj pasamos el json del DataSource => solo obtenemos el valor del atributo eliminando el key del Json. 
  * @returns => retorna valor del atributo sin el key. 
  */
 public Obtenervalor = (obj: any): any[] => { return Object.values(obj); }

 public onSelectAllChange(args: any) {
   this.BusqedaJson = args;
 }

}
