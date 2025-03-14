import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
//shared
import { MdleliminarComponent } from '@shared/pages/modales/mdleliminar/mdleliminar.component';
//prime
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BlockUIModule } from 'primeng/blockui';

@Component({
  selector: 'app-tbpersona',
  standalone: true,
  imports: [
    //shared
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
    BlockUIModule

  ],
  templateUrl: './tbpersona.component.html',
  styleUrl: './tbpersona.component.scss'
})
export class TbpersonaComponent implements OnInit {
  // variable que bloquea la vista
  public Ariesblocked: boolean  = false;
  //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public mdleliminar: boolean = false;
  public _id: number  = -1;


  // variables entre componentes
  @Input()
  public tabla: String = "";

   // retorna la busqueda del servicio
  @Output() BusqedaJson = new EventEmitter<any>();


  //tabla
  public DataSource: any;
  public DataSourceColumnas: any;

 // constructor
 constructor(private servicio: UsuariosService,  private router: Router ){ }

 public ngOnInit(): void {
      this.servicio.Buscar().subscribe(resp => {
        this.DataSource         = resp.Detalle._app_tb_empleados._lst;
        this.DataSourceColumnas = Object.keys(this.DataSource[0]);
        //this.DataSourceColumnas = Object.keys(this.DataSource[0]);
      });
  };


  public Obtenervalor = (obj: any): any[] => { return Object.values(obj); }

 public  ModificarRow( args: any ){
  this.router.navigate([ `/ControlRh/empleado/${ args.id }`]);
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
    // haccemos la busqueda
    this.servicio.Buscar().subscribe(resp => {
      this.DataSource         = resp.Detalle._app_tb_empleados._lst;
      this.DataSourceColumnas = Object.keys(this.DataSource[0]);
    });
  break;
}
// cancelamos el stop
this.Ariesblocked = false;
// reiniciamos el id del registro que se elimino
this._id = -1;
}


}
