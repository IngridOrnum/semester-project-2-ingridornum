import { API_LISTINGS } from "../constants.js";

// Fetch listings based on search input
export async function searchListings(query, limit = 40, page = 1, sortOption = 'latest', filterValue = 'all') {

    const params = new URLSearchParams({
        q: query,
        limit,
        offset: (page - 1) * limit,
        _seller: true,
    });

    if (sortOption === 'latest') {
        params.append('sort', 'created');
        params.append('sortOrder', 'desc');
    } else if (sortOption === 'a-z') {
        params.append('sort', 'title');
        params.append('sortOrder', 'asc');
    }

    if (filterValue === 'active') {
        params.append('_active', 'true');
    }

    const options = {
        method: 'GET'
    };

    const response = await fetch(`${API_LISTINGS}/search?${params.toString()}`, options);
    console.log('search API', `${API_LISTINGS}?${params.toString()}`);

    if (!response.ok) {
        throw new Error(`Error fetching search data: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response data in search:', data);
    return {
        listings: data.data || [],
        meta: data.meta || {},
    };
}
