import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroresService } from '@shared/errores.service';
import { environment } from '../../../../../../environments/environment';
import { Mdllst } from '../models/Mdllst';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient, private errores: ErroresService) { }

  public Buscar(  ): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
     return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
      {
        "ExSchema":"venta",
        "funcion":"_app_lst_persona",
        "data": 
        {
        "_fecha_inicio": "01/06/2024",
        "_fecha_final":  "30/06/2024",
        "_id_": 1
        }
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }

}
