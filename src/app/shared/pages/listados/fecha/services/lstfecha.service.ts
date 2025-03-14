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
export class LstFechaService {
  constructor(private http: HttpClient, private errores: ErroresService) { }


  //data para recargar la busqueda
  public data: any = {};

  public Lstestatus(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/crt/list`,
      {
        Qtabla: 'app_estatus',
      },
      { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }


  public Buscar( exc: String, fun: String,  data: Mdllst ): Observable<any> {
    // data para recargar la info
    this.data = data;
  
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
     return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
      {
        "ExSchema": exc,
        "funcion":  fun,
        "data": 
        {
        "_fecha_inicio": data._fecha_inicio,
        "_fecha_final":  data._fecha_final,
        "_id_":          data._id_
        }
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }

  public RecargarBuscar( exc: String, fun: String ): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
     return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
      {
        "ExSchema": exc,
        "funcion":  fun,
        "data": 
        {
        "_fecha_inicio": this.data._fecha_inicio,
        "_fecha_final":  this.data._fecha_final,
        "_id_":          this.data._id_
        }
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }


}
