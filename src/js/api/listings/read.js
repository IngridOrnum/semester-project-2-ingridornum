import { API_KEY, API_LISTINGS } from "../constants.js";

// Fetch and read all listings
export async function readAllListings(limit = 12, page = 1) {
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


// Single listing