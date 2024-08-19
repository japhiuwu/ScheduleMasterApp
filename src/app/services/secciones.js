import settings from "./settings";
import { HTTPError } from "../utils/HttpError";

export async function DeleteSection(Cod_Carrera, Cod_Clase, Cod_Seccion) {

    const response = await fetch(`${ settings.domain }/cards/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok)
        throw new HTTPError(response);
    else
        return response.json();


};