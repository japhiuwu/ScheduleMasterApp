import settings from "./settings";
import { HTTPError } from '../utils/HttpError'

export async function GetUserInfo() {

    const response = await fetch(`${ settings.domain }/user`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;

}

export async function RedirectM365() {

    const response = await fetch(`${settings.domain}/login/m365`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'manual' // Evita seguir redirecciones automáticamente
    });
    
    if (response.status === 307) {
        const redirectUrl = response.headers.get('Location');
        window.location.href = redirectUrl; // Redirige manualmente
    } else if (response.ok) {
        // Maneja la respuesta como se espera
        const data = await response.json();
        console.log(data);
    } else {
        console.error('Fetch error:', response.status);
    }
}
    

export async function RedirectGoogle() {
    
    const response = await fetch(`${settings.domain}/login/google`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'manual' // Evita seguir redirecciones automáticamente
    });
    console.log(response)
    if (response.status === 307) {
        const redirectUrl = response.headers.get('Location');
        window.location.href = redirectUrl; // Redirige manualmente
    } else if (response.ok) {
        // Maneja la respuesta como se espera
        const data = await response.json();
        console.log(data);
    } else {
        console.error('Fetch error:', response.status);
    }
}
    

export async function ActivateUser(code) {

    const response = await fetch(`${ settings.domain }/user/code/${code}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;

}

export async function Register(userRegistration) {

    const response = await fetch(`${ settings.domain }/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(userRegistration)
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;

}

export async function LoginUser(userLogin) {
    console.log(JSON.stringify(userLogin))

    const response = await fetch(`${ settings.domain }/login/custom`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(userLogin)
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;

}