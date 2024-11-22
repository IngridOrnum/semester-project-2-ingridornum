import {API_KEY, API_LISTINGS} from "../constants.js";
// import {getKey} from "../auth/getKey.js";

// Fetch and read all listings
export async function readAllListings(limit = 12, page = 1, tags) {
    const params = new URLSearchParams({ limit, page });
    if (tags) {
        params.append('_tags', tags);
    }

    const response = await fetch(`${API_LISTINGS}?${params.toString()}`);
    if (!response.ok) {
        console.log('Response:', response);
        throw new Error(`Error fetching data: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
}


// Fetch and read single listing
