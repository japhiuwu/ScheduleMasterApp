import settings from "./settings";
import { HTTPError } from "../utils/HttpError";

export default async function GetTerms(params) {
    const response = await fetch(`${ settings.domain }/terms`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;
}