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

export async function GetClases(Cod_Facultad, Cod_Carrera) {
    const response = await fetch(`${ settings.domain }/facultades/${Cod_Facultad}/carrera/${Cod_Carrera}`,{
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