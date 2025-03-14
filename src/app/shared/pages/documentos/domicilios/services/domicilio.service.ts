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
export class DomicilioService {
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

  /**
   * 
   * @returns retorna el listado de estados filtrado por el pais 146 mexico.
   */
  public lstEstado(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/ctr/filtroIDs`,
    {
      "Qtabla":"estado",
      "_columna": "id_pais",
      "_orderBY": "descripcion",
      "Datos": {"ids": [146]}
    },
    { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }
  
  /**
   * 
   * @param _domicilio  pasamos la lst a filtrar puede ser municipio o localidad unicamente
   * @param _id_estado  _id_estado el estado seleccionado
   * @returns 
   */
  public lstDomicilios( _domicilio: String = "", _id_estado: number = 0 ): Observable<any> {   
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/ctr/filtroIDs`,
    {
      "Qtabla":   _domicilio,
      "_columna": "id_estado",
      "_orderBY": "descripcion",
      "Datos": {"ids": [ _id_estado ]}
    },
    { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }

  /**
   * 
   * @param _domicilio hace referencia al codigo postal a filtrar en el listado.
   * @returns 
   */
  public lstCodigoPostal( _domicilio: String = "" ): Observable<any> {    
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/ctr/columna/buscar`,
    {
      "Qtabla":   "colonia",
      "_Columna": "codigopostal",
      "_OrderBY": "descripcion",
      "_busqueda": _domicilio
    },
    { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }
  
  //==================================================================================================
  //guardar
  public almacenar(tabla: String,  modelo: MdlDomicilio ): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http
      .post(
        `${environment.baseUrl}clientes/ctr/agregar`,
        {
          Qtabla: tabla,
          Datos: modelo,
        },
        { headers: headers }
      )
      .pipe(
        catchError((error) => {
          return throwError(this.errores.getErrores(error));
        })
      );
  }

}
