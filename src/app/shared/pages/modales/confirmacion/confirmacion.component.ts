import { CommonModule } from '@angular/common';
import { Component, Input  } from '@angular/core';
import { DialogModule } from 'primeng/dialog';


interface ConfirmacionMensaje {
  msjTipo: number;
  titulo:  String;
  mensaje: String;
  detalle: String;
}


@Component({
  selector: 'confirmacion-mdl',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule


  ],
  templateUrl: './confirmacion.component.html',
  styleUrl: './confirmacion.component.scss'
})
export class ConfirmacionComponent {
  
  @Input()
  public ConfirmacionMsjMdl: ConfirmacionMensaje = { msjTipo: 1, titulo: '', mensaje: '', detalle: '' };
  
  @Input()
  public ConfirmacionMdl: boolean = false;

}
