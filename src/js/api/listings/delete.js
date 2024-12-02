import { API_KEY, API_LISTINGS } from "../constants.js";
import {getAccessToken} from "../auth/getAccessToken.js";

export async function apiDeleteListing (id) {
    const accessToken = await getAccessToken();

    const options = {
        method: 'DELETE',
        headers: {
            'X-Noroff-API-Key': API_KEY,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    };

    try {
        const response = await fetch(`${API_LISTINGS}/${id}`, options);

        if(!response.ok) {
            const data = await response.json;
            throw new Error(data.errors ? data.errors[0].message : 'An error occurred while deleting the listing');
        }

        return { ok: response.ok}
    } catch (error) {
        console.error('Error deleting listing:', error);
        throw error;
    }
}