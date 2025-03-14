import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroresService } from '@shared/errores.service';
import { environment } from '../../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class buscarService {

    constructor(private http: HttpClient, private errores: ErroresService) { }

    public Buscar(id: number): Observable<any> {
        let headers = new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
          {
            "ExSchema":"contabilidad",
            "funcion":"fis_comprobante_fiscal",
            "data":  { "id_fiscal": id}
          },
          { headers: headers }
        ).pipe(catchError((error) => {
            return throwError(this.errores.getErrores(error));
          })
        );
      }
    //===================================================================================================
}