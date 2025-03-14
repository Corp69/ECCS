import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// servicios
import { GenericoService } from './services/generico.service';
//prime
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-generica',
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
    MessageModule,
    TooltipModule
  ],
  templateUrl: './generica.component.html',
  styleUrl: './generica.component.scss'
})
export class GenericaComponent implements OnInit {
  // formulario
  public frm: FormGroup = this.fb.group({ descripcion: [, [Validators.required, Validators.minLength(1)]] });
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
  constructor(
  
      private fb: FormBuilder, 
      private servicio: GenericoService) { }
 
 
   public ngOnInit(): void {
    
    this.DataSource = null;
    this.DataSourceColumnas = null;

  }
  //metodo que realiza la busqueda
  public buscarinfo = () => {
    //=======================================================================================
    this.servicio.Buscar(this.tabla, this.frm.value.descripcion).subscribe(resp => {
      switch ( resp.IdMensj ) {
        //=======================================================================================
        case 3:
          this.DataSource = [];
          this.DataSourceColumnas = [];
          break;
        //=======================================================================================
        case 2:
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
              this.DataSource         = resp.Detalle._app_cfdi_uso_x_regimen._lst;
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
    this.BusqedaJson.emit(args);
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
