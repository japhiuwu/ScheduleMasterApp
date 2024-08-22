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

    return Validations(response);
}

export async function Validations(response){
    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            // Maneja el error de autorización aquí
            console.error('Unauthorized: Token inválido o expirado.');
            localStorage.removeItem('token');

            // Evita el redireccionamiento si ya estás en la página de login
            if (window.location.pathname !== '/login') {
                // Redirige al usuario a la página de inicio de sesión
                window.location.href = '/login';
            }

            // O puedes devolver algo que indique que hubo un error de autorización
            return { status: response.status,error: 'Unauthorized' };
        } else if(response.status === 500){
            return { status: response.status,error: 'Internal Server Error' };
        } else if(response.status === 404){
            return { status: response.status,error: 'No Encontrado' };
        }
        console.log(response);
        throw new HTTPError(response);
    }

    const data = await response.json();
    return {status: 200, data};
}