import settings from "./settings";
import { HTTPError } from "../utils/HttpError";

export async function GetEdificios(params) {
    const response = await fetch(`${ settings.domain }/edificios`,{
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

export async function GetAulas(id) {
    const response = await fetch(`${ settings.domain }/edificios/${id}`,{
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

export async function GetAula(Cod_Edificio, Num_Aula) {
    const response = await fetch(`${ settings.domain }/edificios/${Cod_Edificio}/aulas/${Num_Aula}`,{
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