import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MdlProveedor } from '../models/MdlProveedor';
import { ErroresService } from '@shared/errores.service';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MdlEliminarService {
  constructor(private http: HttpClient, private errores: ErroresService) { }


  // metodo que elimina 
  public Eliminar(_Table: String, id: number): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(`${environment.baseUrl}clientes/ctr/eliminar`,
    {
        "Qtabla": _Table,
        "Datos": {
            "ids": [id]
        }
    },
      { headers: headers }
    ).pipe(
      catchError((error) => {
        return throwError(this.errores.getErrores(error));
      })
    );
  }

}
