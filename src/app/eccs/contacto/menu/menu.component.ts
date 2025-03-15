import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ImportsModule from '@shared/primeng/ImportsModule';

@Component({
  selector: 'app-menu',
  imports: [ 


    ImportsModule


  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'

})
export class MenuComponent {

  constructor(private router: Router) {}

  public Ira( url: string){
    // Navegar a la ruta '/home'
    this.router.navigate([`/eccs/principal/${url}`]);
  }
  
}
