import settings from "./settings";
import { HTTPError } from "../utils/HttpError";
import { Validations } from "./extras";

export async function GetFacultades(params) {
    const response = await fetch(`${ settings.domain }/facultades`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
            , 'Cache-Control': 'no-cache'
        }
    });

    return Validations(response);
}

export async function GetFacultad(Cod_Facultad) {
    const response = await fetch(`${ settings.domain }/facultades/${Cod_Facultad}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
            , 'Cache-Control': 'no-cache'
        }
    });

    return Validations(response);
}

export async function GetClases(Cod_Facultad, Cod_Carrera, term) {
    const response = await fetch(`${ settings.domain }/facultades/${Cod_Facultad}/carrera/${Cod_Carrera}/term/${term}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
            , 'Cache-Control': 'no-cache'
        }
    });

    return Validations(response);
}

export async function GetClaseSeccion(Cod_Facultad, Cod_Carrera, Cod_Clase, storedTerm) {
    const response = await fetch(`${settings.domain}/facultades/${Cod_Facultad}/carrera/${Cod_Carrera}/clase/${Cod_Clase}/term/${storedTerm}/secciones`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
            , 'Cache-Control': 'no-cache',
        },
    });

    return Validations(response);
}

export async function GetClase(Cod_Facultad, Cod_Carrera, Cod_Clase) {
    const response = await fetch(`${settings.domain}/facultades/${Cod_Facultad}/carrera/${Cod_Carrera}/clase/${Cod_Clase}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
            , 'Cache-Control': 'no-cache',
        },
    });

    return Validations(response);
}


export async function GetSeccion(term, Cod_Carrera, Cod_Clase, Cod_Seccion) {
    const response = await fetch(`${ settings.domain }/term/${term}/carrera/${Cod_Carrera}/clase/${Cod_Clase}/seccion/${Cod_Seccion}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
            , 'Cache-Control': 'no-cache'
        }
    });

    return Validations(response);
}