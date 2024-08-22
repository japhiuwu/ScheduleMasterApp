import settings from "./settings";
import { HTTPError } from "../utils/HttpError";

export default async function GetTerms(params) {
    const response = await fetch(`${settings.domain}/terms`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Cache-Control': 'no-cache',
        },
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

    const data = await response.json();
    return data;
}
