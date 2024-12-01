import {API_LISTINGS, API_KEY} from "../constants.js";
import {getAccessToken} from "../auth/getAccessToken.js";

export async function apiCreateListing({title, description, media, tags, endsAt}) {

    try {
        const accessToken = await getAccessToken();

        const options = {
            method: 'POST',
            headers: {
                'X-Noroff-API-Key': API_KEY,
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, description, media, tags, endsAt})
        };

        const response = await fetch(API_LISTINGS, options);
        const data = await response.json();

        if (!response.ok) {
            console.error("Full API Error Response:", data);
            throw new Error(data.errors ? data.errors[0].message : "An error occurred.");
        }

        return {data, ok: response.ok};

    } catch (error) {
        console.error("Error in apiCreateListing:", error);
        throw error;
    }
}