import {API_KEY, API_LISTINGS} from "../constants.js";

// Search for listings globally
export async function searchListings(query, limit = 12, page = 1) {
    const endpoint = query
        ? `${API_LISTINGS}/search?q=${encodeURIComponent(query)}`
        : `${API_LISTINGS}?limit=${limit}&page=${page}`;
    console.log(endpoint);

    const response = await fetch(endpoint, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`, // Add API key if required
        },
    });

    if (!response.ok) {
        console.log('Response:', response);
        throw new Error(`Error fetching data: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
}
