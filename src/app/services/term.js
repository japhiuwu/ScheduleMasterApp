import settings from "./settings";
import { HTTPError } from "../utils/HttpError";
import { Validations } from "./extras";

export default async function GetTerms(params) {
    const response = await fetch(`${settings.domain}/terms`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Cache-Control': 'no-cache',
        },
    });

    return Validations(response);
}
