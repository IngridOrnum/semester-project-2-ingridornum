import { API_LISTINGS } from "../constants.js";

// Fetch listings based on search input
export async function searchListings(query, limit = 40, page = 1, sortOption = 'latest') {

    const params = new URLSearchParams({
        q: query,
        limit,
        offset: (page - 1) * limit
    });

    if (sortOption === 'latest') {
        params.append('sort', 'created');
        params.append('sortOrder', 'desc');
    } else if (sortOption === 'a-z') {
        params.append('sort', 'title');
        params.append('sortOrder', 'asc');
    }

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
