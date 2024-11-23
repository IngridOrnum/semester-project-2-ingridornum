import {API_LISTINGS} from "../constants.js";

export async function searchListings(query) {
    try {
        if (!query.trim()) {
            console.error('Search query is empty or missing. No API call will be made.');
            return { listings: [] }; // Return empty results gracefully
        }

        // Construct the endpoint for the search API
        const endpoint = `${API_LISTINGS}/search?q=${encodeURIComponent(query)}`;
        console.log('Constructed Endpoint:', endpoint);

        // Make the API call
        const response = await fetch(endpoint);

        if (!response.ok) {
            console.error('Response Status:', response.status, response.statusText);
            throw new Error(`Error fetching data: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response Data:', data);

        return {listings: data.data || [] };
    } catch (error) {
        console.error('Error in searchListings:', error.message);
        throw error;
    }
}

// import {API_LISTINGS} from "../constants.js";
//
// export async function searchListings(query, limit = 12, page = 1) {
//     const params = new URLSearchParams();
//     if (query) params.append('q', query);
//     params.append('limit', limit);
//     params.append('page', page);
//
//     const endpoint = `${API_LISTINGS}/search?${params.toString()}`;
//     console.log('Constructed Endpoint:', endpoint);
//
//     let response;
//
//     try {
//         response = await fetch(endpoint);
//
//         if (!response.ok) {
//             console.log('Response:', response);
//             throw new Error(`Error fetching data: ${response.status}`);
//         }
//
//         const data = await response.json();
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.error('Error in searchListings', error.message);
//         throw error;
//     }
// }
