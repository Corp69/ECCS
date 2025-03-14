import { Component } from '@angular/core';
import ImportsModule from '@shared/primeng/ImportsModule';


@Component({
  selector: 'app-registro',
  imports: [

       //prime NG MODULE
       ImportsModule 

  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

}
