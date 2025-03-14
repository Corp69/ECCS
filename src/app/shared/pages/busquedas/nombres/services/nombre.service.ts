import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroresService } from '@shared/errores.service';
import { environment } from '../../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NombreService {

    constructor(private http: HttpClient, private errores: ErroresService) { }

    public Buscar(_tabla: String, _item: String): Observable<any> {
        let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
        return this.http.post(`${environment.baseUrl}clientes/ctr/buscar/nombre`,
            { "Qtabla": _tabla, "_busqueda": _item },
            { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
    }
    //===================================================================================================
}