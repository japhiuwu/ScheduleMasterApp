import settings from "./settings";
import { HTTPError } from "../utils/HttpError";

export async function GetFacultades(params) {
    const response = await fetch(`${ settings.domain }/facultades`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;
}

export async function GetFacultad(Cod_Facultad) {
    const response = await fetch(`${ settings.domain }/facultades/${Cod_Facultad}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;
}

export async function GetClases(Cod_Facultad, Cod_Carrera, term) {
    const response = await fetch(`${ settings.domain }/facultades/${Cod_Facultad}/carrera/${Cod_Carrera}/term/${term}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;
}

export async function GetClase(Cod_Facultad, Cod_Carrera, Cod_Clase, storedTerm) {
    const response = await fetch(`${settings.domain}/facultades/${Cod_Facultad}/carrera/${Cod_Carrera}/clase/${Cod_Clase}/term/${storedTerm}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        },
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;
}


export async function GetSeccion(Cod_Facultad, Cod_Carrera, Cod_Clase, Cod_Seccion) {
    const response = await fetch(`${ settings.domain }/facultades/${Cod_Facultad}/carrera/${Cod_Carrera}/clase/${Cod_Clase}/seccion/${Cod_Seccion}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'  
            , 'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;
}