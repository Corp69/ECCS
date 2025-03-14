import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

//shared
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MdlEliminarService } from './Services/MdlEliminar.service';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmacionMensaje } from '@shared/interfaces/Aries';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';

@Component({
  selector: 'app-mdleliminar',
  standalone: true,
  imports: [
    CommonModule ,
    //prime ng
    DialogModule,
    ButtonModule,
    TooltipModule,

    //shared 
    ConfirmacionComponent

  ],
  templateUrl: './mdleliminar.component.html',
  styleUrl: './mdleliminar.component.scss'
})
export class MdleliminarComponent {

  @Input()
  public mdleliminar: boolean = false;

  @Input()
  public _tabla: String = "";

  @Input()
  public _id: number = -1;

  // retorna la busqueda del servicio
  @Output() _rowconfirmacion = new EventEmitter<boolean>();

    //==============================================================================================================
  // Modal: mensaje Confirmacion falso para no cargar la modal
  public ConfirmacionMdl: boolean = false;
  // variables para mensaje actualizar guardar
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: "", mensaje: "", detalle: "" };

// constructor
 constructor( private servicio: MdlEliminarService) { }

  //eliminamo
  public OnEliminar(){
    this.servicio.Eliminar( this._tabla, this._id ).subscribe(async resp => {
      this._tabla = "";
      this._id    = -1;
      this.mdleliminar = false;
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
          // mostramos el resultado de la informacion
          this.ConfirmacionMdl  = true;
          //============================================================
          this.ConfirmacionMsjMdl.msjTipo = resp.IdMensj;
          this.ConfirmacionMsjMdl.titulo  = 'Aries: Info'; //resp.Titulo;
          this.ConfirmacionMsjMdl.mensaje = resp.Mensaje;
          this.ConfirmacionMsjMdl.detalle = resp.Detalle.error.code == "23503" ? " ERROR: lo que se intenta eliminar, dependen más registros. Lo cual se cancela la operación." : resp.Detalle.error;
        
          await setTimeout(() => {
            this._rowconfirmacion.emit(false);
          }, 8000); // 3000 milliseconds = 3 seconds
          break;
        default:
           this._rowconfirmacion.emit(true);
          break;
      }
    });
  }

  //cerramos la modal
  public OnCancelar(){
    this._tabla = "";
    this._id    = -1;
    this.mdleliminar = false;
    this._rowconfirmacion.emit( false );
  }

}
