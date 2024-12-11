import { API_LISTINGS } from "../constants.js";

// Fetch listings based on search input
export async function searchListings(query, limit = 24, offset = 0) {
    const params = new URLSearchParams({ q: query, limit, offset });

    const response = await fetch(`${API_LISTINGS}/search?${params.toString()}`);
    if (!response.ok) {
        throw new Error(`Error fetching search data: ${response.status}`);
    }

    const data = await response.json();
    return {
        listings: data.data || [],
        meta: data.meta || {},
    };
}
