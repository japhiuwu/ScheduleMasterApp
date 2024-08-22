import settings from "./settings";
import { HTTPError } from "../utils/HttpError";

export async function DeleteSection(Cod_Perdiodo, Cod_Carrera, Cod_Clase, Cod_Seccion) {

    const response = await fetch(`${ settings.domain }/term/${Cod_Perdiodo}/carrera/${Cod_Carrera}/clase/${Cod_Clase}/seccion/${Cod_Seccion}`,{
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

export async function UpdateSection(Cod_Periodo, Cod_Carrera, Cod_Clase, Cod_Seccion, Seccion) {
    console.log(JSON.stringify(Seccion));
    const response = await fetch(`${ settings.domain }/term/${Cod_Periodo}/carrera/${Cod_Carrera}/clase/${Cod_Clase}/seccion/${Cod_Seccion}`,{
        method: 'PUT',
        body: JSON.stringify(Seccion),
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

export async function CreateSection(Seccion) {
    Seccion.Portada ='';
    Seccion.Dias = 'LuMiVi';
    console.log(JSON.stringify(Seccion));
    const response = await fetch(`${ settings.domain }/seccion`,{
        method: 'POST',
        body: JSON.stringify(Seccion),
        headers: {
            'Content-Type': 'application/json'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
            , 'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok){
        throw new HTTPError(response);
        console.log(response)}
    else
        return response.json();
};