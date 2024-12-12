import { API_LISTINGS } from "../constants.js";

// Fetch listings based on search input
export async function searchListings(query, limit = 24, page = 1) {
    const offset = (page - 1) * limit;
    const params = new URLSearchParams({ q: query, limit, offset});
    const url = `${API_LISTINGS}/search?${params.toString()}`;
    console.log("URL being requested:", url);

    const options = {
        method: 'GET'
    };

    const response = await fetch(`${API_LISTINGS}/search?${params.toString()}`, options);
    console.log(response)

    if (!response.ok) {
        throw new Error(`Error fetching search data: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response data:', data);

    return {
        listings: data.data || [],
        meta: data.meta || {},
    };
}
