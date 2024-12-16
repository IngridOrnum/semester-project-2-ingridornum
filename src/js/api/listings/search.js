import { API_LISTINGS } from "../constants.js";

export async function searchListings(query, limit = 40, page = 1, sortOption = 'latest', filterValue = 'all') {

    const params = new URLSearchParams({
        q: query,
        limit,
        offset: (page - 1) * limit,
        _seller: true,
        _bids: true,
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
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };

    const response = await fetch(`${API_LISTINGS}/search?${params.toString()}`, options);

    if (!response.ok) {
        throw new Error(`Error fetching search data: ${response.status}`);
    }

    const data = await response.json();

    return {
        listings: data.data || [],
        meta: data.meta || {},
    };
}
