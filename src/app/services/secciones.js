import settings from "./settings";
import { HTTPError } from "../utils/HttpError";
import { Validations } from "./extras";

export async function DeleteSection(Cod_Perdiodo, Cod_Carrera, Cod_Clase, Cod_Seccion) {

    const response = await fetch(`${ settings.domain }/term/${Cod_Perdiodo}/carrera/${Cod_Carrera}/clase/${Cod_Clase}/seccion/${Cod_Seccion}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    return Validations(response);
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

    return Validations(response);
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

    return Validations(response);
};

export async function SectionUploadProfile( id, files ){

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch(`${ settings.domain }/cards/${id}/files`,{
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            , 'Cache-Control': 'no-cache'
        }
    });

    return Validations(response);
}