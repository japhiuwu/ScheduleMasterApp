import settings from "./settings";
import { HTTPError } from "../utils/HttpError";

export async function GetDocentes(Cod_Carrera) {
    const response = await fetch(`${ settings.domain }/docentes/${Cod_Carrera}`,{
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