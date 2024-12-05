import {API_KEY, API_LISTINGS} from "../constants.js";
import {getAccessToken} from "../auth/getAccessToken.js";

// Read all listings
export async function readAllListings(limit = 24, page = 1,) {
    const params = new URLSearchParams({ limit, page });

    const response = await fetch(`${API_LISTINGS}?${params.toString()}`);
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
    }

    const data = await response.json();
    return {
        listings: data.data || [],
        meta: data.meta || {},
    };
}

// Read single listing

export async function readSingleListing (id) {
    const accessToken = await getAccessToken();

    const options = {
        method: 'GET',
        headers: {
            'X-Noroff-API-Key': API_KEY,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(`${API_LISTINGS}/${id}?_bids=true&_seller=true`, options)
    if (!response.ok) {
        console.error('Failed to fetch profile data:', response);
        throw new Error(`Error fetching profile data: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
}