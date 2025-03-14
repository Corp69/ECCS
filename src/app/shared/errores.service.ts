import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErroresService {

  constructor() { }

  public getErrores(error: HttpErrorResponse): string {
    switch (error.status) {      
      case 400: {
        return  JSON.stringify({ error: error.error  }, null, 2); // Indentación para mayor legibilidad
      }
      case 404: {
          return JSON.stringify({ error: error.error  }, null, 2); // Indentación para mayor legibilidad
        }
      case 403: {
        return JSON.stringify({ error: error.error  }, null, 2); // Indentación para mayor legibilidad
      }
      case 500: {
        return JSON.stringify({ error: error.error  }, null, 2);;
      }
      default: {
        return JSON.stringify({ error: error.error  }, null, 2); // Indentación para mayor legibilidad
      }
      }
    }
  }

