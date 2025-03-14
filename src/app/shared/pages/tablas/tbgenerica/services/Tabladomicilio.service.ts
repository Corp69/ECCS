import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroresService } from '@shared/errores.service';
import { environment } from '../../../../../../environments/environment';
import { MdlDomicilio } from '../models/MdlDomicilio';

@Injectable({
  providedIn: 'root',
})
export class TablaDomicilioService {
  constructor(private http: HttpClient, private errores: ErroresService) { }


  // ? ==================================================================================
  // resolver obtnemos informacion del registro
  public Datainfo(id: number): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/ctr/buscar/id/${id}`,
      {
        Qtabla: 'proveedor',
      },
      { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }

  public Buscar(_tabla: String, _id: number ): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
    {
      "ExSchema": "config",
      "funcion": "_proveedor_domicilio",
      "data": {
            "_id_proveedor":     _id
        }
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }

}
