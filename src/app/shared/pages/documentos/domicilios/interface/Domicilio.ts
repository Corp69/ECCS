export interface ConfirmacionMensaje {
    msjTipo: number;
    titulo:  String;
    mensaje: String;
    detalle: String;
  }


// busqueda del proveedor
export interface DataNombreMDL {
  tabla:   String;
  nombre:   String;
  rfc:      String;
  codigo:   String;
}


// busqueda del proveedor
export interface lstDomicilio {
  "Titulo:": String;
  "IdMensj": Number;
  "Mensaje": String;
  "Detalle": {
    "id": number;
    "descripcion": string;
    "id_pais": string;
    "clave": string;
    "c_estado": string;
    "codigo": string;
    "codigo_ine": string;
    "predeterminado": boolean;
  }[];
}



