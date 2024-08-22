import settings from "./settings";
import { useRouter } from "next/navigation";
import { HTTPError } from "../utils/HttpError";
import { Validations } from "./extras";

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
        if (response.status === 401) {
            // Maneja el error de autorización aquí
            console.error('Unauthorized: Token inválido o expirado.');
            localStorage.removeItem('token');

            // Evita el redireccionamiento si ya estás en la página de login
            if (window.location.pathname !== '/login') {
                // Redirige al usuario a la página de inicio de sesión
                window.location.href = '/login';
            }

            // O puedes devolver algo que indique que hubo un error de autorización
            return { error: 'Unauthorized' };
        }
        console.log(response);
        throw new HTTPError(response);
    }

    return Validations(response);
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

    return Validations(response);
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

    return Validations(response);
}