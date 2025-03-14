import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroresService } from '@shared/errores.service';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TbDomicilioService {
  constructor(private http: HttpClient, private errores: ErroresService) { }

  public Buscar(_sc: String, _fn: String, _id: number ): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
    {
      "ExSchema": _sc,
      "funcion": _fn,
      "data": {
            "_id_persona":     _id
        }
    },
      { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
  }
}
