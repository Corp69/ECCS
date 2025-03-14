import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroresService } from '@shared/errores.service';
import { environment } from '../../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GenericoService {

    constructor(private http: HttpClient, private errores: ErroresService) { }

    public Buscar( _tabla: String, _item: String): Observable<any> {
        let headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
        switch (_tabla) {
            case "sat_usocfdi":
                return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
                    {
                        "ExSchema": "config",
                        "funcion":  "_app_cfdi_uso_X_regimen",
                        "data": 
                        {
                            "_uso":     true,
                            "_codigo": _item
                        }
                    },
                    { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));        
                break;
            case "sat_regimenfiscal":
                return this.http.post(`${environment.baseUrl}clientes/ctr/schema`,
                    {
                        "ExSchema": "config",
                        "funcion":  "_app_cfdi_uso_X_regimen",
                        "data": 
                        {    
                            "_uso":     false,
                            "_codigo": _item
                        }
                    },
                    { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));        
                break;
            default:
            return this.http.post(`${environment.baseUrl}clientes/ctr/buscar`,
                { "Qtabla": _tabla, "_busqueda": _item },
                { headers: headers }).pipe(catchError(error => { return throwError(this.errores.getErrores(error)); }));
            break;
            }        
        }
    //===================================================================================================
}