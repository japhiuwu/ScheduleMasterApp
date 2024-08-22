import settings from "./settings";
import { useRouter } from "next/navigation";
import { HTTPError } from "../utils/HttpError";

export async function GetEdificios(params) {
    const response = await fetch(`${ settings.domain }/edificios`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
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
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
            , 'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok) {
        throw new HTTPError(response);
        router
    }

    const data = await response.json();
    return data;
}

export async function GetAula(Cod_Edificio, Num_Aula, term) {
    const response = await fetch(`${ settings.domain }/edificios/${Cod_Edificio}/aulas/${Num_Aula}/term/${term}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
            , 'Cache-Control': 'no-cache'
        }
        
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;
}