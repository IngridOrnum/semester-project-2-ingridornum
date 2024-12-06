import {API_KEY, API_LISTINGS} from "../constants.js";
import {getAccessToken} from "../auth/getAccessToken.js";

// Read all listings
export async function readAllListings(limit = 24, page = 1,) {
    const params = new URLSearchParams({
        limit,
        page
    });

    const response = await fetch(`${API_LISTINGS}?${params.toString()}&_seller=true&_bids=true`);
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Request URL:', `${API_LISTINGS}?${params.toString()}&_seller=true&_bids=true`);
    console.log('API Response:', data);
    return {
        listings: data.data || [],
        meta: data.meta || {},
    };
}

// Fetch all listings across multiple pages

let cachedAllListings = null;
export async function fetchAllListings() {

    if (cachedAllListings) {
        return cachedAllListings;
    }

    let page = 1;
    let allListings = [];
    let isLastPage = false;

    while (!isLastPage) {
        const response = await readAllListings(24, page);
        allListings = [...allListings, ...response.listings];
        isLastPage = response.meta.isLastPage; // Check if it's the last page
        page += 1; // Increment to fetch the next page
    }

    cachedAllListings = allListings;
    return allListings;
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