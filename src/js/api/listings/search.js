import { API_KEY, API_LISTINGS } from "../constants.js";

// Fetch listings based on search input
export async function searchListings(query, limit = 12, page = 1) {
    const params = new URLSearchParams({ q: query, limit, page });

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
